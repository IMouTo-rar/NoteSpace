// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod config;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            config::perference::save_recoil_state_to_config,
            config::perference::load_recoil_state_from_config,
            ],)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
