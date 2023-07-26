// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod modules;

fn main() {
    tauri::Builder::default()
        .manage(modules::autocomplete::Dictionary::new())
        .invoke_handler(tauri::generate_handler![
            modules::perference::save_recoil_state_to_config,
            modules::perference::load_recoil_state_from_config,
            modules::autocomplete::autocomplete,
            ],)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
