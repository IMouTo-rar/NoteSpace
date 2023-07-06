// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod file_utils;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![file_utils::atom_storage::save_recoil_state_to_config])
        .invoke_handler(tauri::generate_handler![file_utils::atom_storage::load_recoil_state_from_config])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
