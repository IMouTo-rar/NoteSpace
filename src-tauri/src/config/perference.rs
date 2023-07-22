use serde::{Deserialize, Serialize};
use std::{fmt, fs};
use tauri::Error;

#[derive(Default, Serialize, Deserialize)]
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

// 将Atom数据保存到文件中
#[tauri::command]
pub fn save_recoil_state_to_config(data: serde_json::Value) -> Result<(), Error> {
    let conf_path = "../outer/config/perference.json";

    // 解析json to Atoms
    let atoms: Atoms = match serde_json::from_value(data) {
        Ok(json) => json,
        Err(error) => {
            // 处理 JSON 解析错误
            return Err(Error::Json(error));
        }
    };

    // 将更新后的 Atoms 结构体序列化为 JSON 字符串
    let json_data = serde_json::to_string_pretty(&atoms)?;

    // 写入更新后的数据
    fs::write(conf_path, json_data)?;

    Ok(())
}

// 从文件中加载Atom数据
#[tauri::command]
pub fn load_recoil_state_from_config() -> serde_json::Value {
    let conf_path = "../outer/config/perference.json";

    // 读取数据
    let content = match fs::read_to_string(conf_path) {
        Ok(contents) => contents,
        Err(_) => String::new(),
    };

    let json_data = serde_json::from_str(&content).unwrap();
    json_data
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_save_recoil_state_to_config() {
        let atoms_data = serde_json::json!({
            "selected_button": null,
            "selected_theme": "dark"
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
