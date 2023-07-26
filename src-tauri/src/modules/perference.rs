use serde::{Deserialize, Serialize};
use std::{fmt, fs};

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
pub fn save_recoil_state_to_config(data: serde_json::Value) -> Result<(), String> {
    let conf_path = "../outer/config/perference.json";

    // 解析json to Atoms
    let atoms: Atoms = match serde_json::from_value(data) {
        Ok(json) => json,
        Err(_) => {
            return Err("JSON 解析错误".to_string());
        }
    };

    // 将更新后的 Atoms 结构体序列化为 JSON 字符串
    let json_data = serde_json::to_string_pretty(&atoms).unwrap();

    // 写入更新后的数据
    match fs::write(conf_path, json_data) {
        Ok(_) => {}
        Err(_) => {
            return Err("文件写入错误".to_string());
        }
    };

    Ok(())
}

// 从文件中加载Atom数据
#[tauri::command]
pub fn load_recoil_state_from_config() -> Result<serde_json::Value, String> {
    let conf_path = "../outer/config/perference.json";

    // 读取数据
    let content = match fs::read_to_string(conf_path) {
        Ok(contents) => contents,
        Err(_) => {
            return Err("文件读取错误".to_string());
        },
    };

    let json_data = serde_json::from_str(&content).unwrap();
    Ok(json_data)
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
        // 调用被测试的函数
        let result = load_recoil_state_from_config();

        // 检查返回结果
        match result {
            Ok(json_data) => {
                // 在这里对 Ok 返回值进行断言
                assert!(json_data.is_object(), "Expected JSON object");
                // 进一步对 json_data 进行其他断言
                println!("JSON data: {}", json_data);
            }
            Err(error) => {
                // 在这里对 Err 返回值进行断言
                panic!("Test failed with error: {}", error);
            }
        }
    }
}
