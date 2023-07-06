use std::{fs, fmt};
use serde::{Deserialize, Serialize};
use tauri::Error;

#[derive(Serialize, Deserialize)]
pub struct Atoms<'a> {
    selected_button: &'a str,
    selected_theme: &'a str,
}

impl fmt::Display for Atoms<'_> {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "selected_button: {}, selected_theme: {}", self.selected_button, self.selected_theme)
    }
}

#[tauri::command]
pub fn save_recoil_state_to_config(atoms_data: serde_json::Value) -> Result<(), Error>{
    let conf_path = "config.toml";
    let atoms = Atoms {
        selected_button: atoms_data["selected_button"].as_str().unwrap(),
        selected_theme: atoms_data["selected_theme"].as_str().unwrap(),
    };
    let toml_string = toml::to_string(&atoms).unwrap();
    fs::write(conf_path, toml_string).expect("Unable to write file");
    Ok(())
}

#[tauri::command]
pub fn load_recoil_state_from_config() -> Result<serde_json::Value, Error> {
    let conf_path = "config.toml";
    let content = fs::read_to_string(conf_path).unwrap();
    let toml_data: toml::Value = toml::from_str(&content).unwrap();
    let json_data = serde_json::json!(toml_data);
    Ok(json_data)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_save_recoil_state_to_config() {
        let atoms_data = serde_json::json!({
            "selectedButton": Some("Home"),
            "selectedTheme": Some("dark"),
        });
        let result = save_recoil_state_to_config(atoms_data);
        assert!(result.is_ok());
    }

    #[test]
    fn test_load_recoil_state_from_config() {
        let result = load_recoil_state_from_config();
        assert!(result.is_ok());
        print!("{}", result.unwrap());
    }
}