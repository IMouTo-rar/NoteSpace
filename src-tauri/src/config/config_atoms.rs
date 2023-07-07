use serde::{Deserialize, Serialize};
use std::{fmt, fs};
use tauri::Error;

#[derive(Serialize, Deserialize)]
pub struct Atoms {
    // Option, 允许获得空值
    selected_button: Option<String>,
    selected_theme: Option<String>,
}

impl fmt::Display for Atoms {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            f,
            "selected_button: {}, selected_theme: {}",
            self.selected_button.as_ref().unwrap(),
            self.selected_theme.as_ref().unwrap()
        )
    }
}

#[tauri::command]
pub fn save_recoil_state_to_config(atoms_data: serde_json::Value) -> Result<(), Error> {
    let conf_path = "config.toml";

    // 解析json to Atoms
    let atoms: Atoms = match serde_json::from_value(atoms_data) {
        Ok(json) => json,
        Err(error) => {
            // 处理 JSON 解析错误
            return Err(Error::Json(error));
        }
    };

    // 读取现有的 TOML 数据
    let mut toml_string = match fs::read_to_string(conf_path) {
        Ok(contents) => contents,
        Err(_) => String::new(),
    };

    // 将现有的 TOML 数据反序列化为 Atoms 结构体
    let mut existing_atoms: Atoms = match toml::from_str(&toml_string) {
        Ok(toml) => toml,
        Err(_) => Atoms {
            selected_button: None,
            selected_theme: None,
        }, // 如果 TOML 解析失败，则使用默认的 Atoms 结构体
    };

    // 更新现有的 Atoms 结构体字段
    if let Some(selected_button) = atoms.selected_button {
        existing_atoms.selected_button = Some(selected_button);
    }
    if let Some(selected_theme) = atoms.selected_theme {
        existing_atoms.selected_theme = Some(selected_theme);
    }

    // 将更新后的 Atoms 结构体序列化为 TOML 字符串
    toml_string = toml::to_string(&existing_atoms).unwrap();

    // 写入更新后的 TOML 数据
    fs::write(conf_path, toml_string)?;

    Ok(())
}

#[tauri::command]
pub fn load_recoil_state_from_config() -> String {
    let conf_path = "config.toml";
    let content = fs::read_to_string(conf_path).expect("Unable to read file.");
    let toml_data: toml::Value = toml::from_str(&content).unwrap();
    let json_data = serde_json::json!(toml_data);
    json_data.to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_save_recoil_state_to_config() {
        let atoms_data = serde_json::json!({
            "selected_button": Some("Home"),
            "selected_theme": Some("dark"),
        });
        let result = save_recoil_state_to_config(atoms_data);
        assert!(result.is_ok());
    }

    #[test]
    fn test_load_recoil_state_from_config() {
        let result = load_recoil_state_from_config();
        print!("{}", result);
    }
}
