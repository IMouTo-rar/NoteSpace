use std::path::PathBuf;
use walkdir::WalkDir;

// 加载主题css文件
#[tauri::command]
pub fn get_css_files() -> Vec<String> {
    let css_files: Vec<PathBuf> = WalkDir::new("../outer/style")
    // Replace with the actual path to your CSS directory
        .into_iter()
        .filter_map(|entry| {
            let entry = entry.ok()?;
            if entry.file_type().is_file() {
                if let Some("css") = entry.path().extension().and_then(std::ffi::OsStr::to_str) {
                    Some(entry.path().to_path_buf())
                } else {
                    None
                }
            } else {
                None
            }
        })
        .collect();

    css_files
        .iter()
        .filter_map(|path| path.canonicalize().ok())
        .filter_map(|path| path.to_str().map(|s| s.to_string()))
        .collect()
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_get_css_files() {
        let result = get_css_files();
        println!("{:?}", result);
    }
}
