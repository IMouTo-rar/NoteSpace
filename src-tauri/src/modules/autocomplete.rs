use std::collections::HashSet;
use std::fs;
use serde_json::Value;

pub struct Dictionary {
    keywords: HashSet<String>,
}

impl Dictionary {
    // initialize the dictionary
    pub fn new() -> Self {
        let mut dictionary = Dictionary {
            keywords: HashSet::new(),
        };
        match load_dictionary_from_json(&mut dictionary) {
            Ok(_) => {},
            Err(error) => {
                println!("Error: {}", error);
            },
        }
        dictionary
    }
}

impl Default for Dictionary {
    fn default() -> Self {
        Self::new()
    }
}

#[tauri::command]
pub fn autocomplete(state: tauri::State<'_, Dictionary>, input: &str) -> Result<Vec<String>, String> {
    let input = input.to_string();
    let input_content = input.trim();

    // 检查是否需要进行补全
    if let Some(index) = input_content.find('/') {
        let syntax = &input_content[(index + 1)..];

        // 在字典中找到所有能够补全的单词
        let dictionary = state.keywords.clone();
        let mut completions = Vec::new();

        // 遍历字典中的每个单词，检查是否能够补全给定的语法
        for word in dictionary {
            if word.starts_with(syntax) {
                completions.push(word.to_string());
            }
        }
        Ok(completions)
    } else {
        Ok(Vec::new())
    }
}

// 从json中加载字典
fn load_dictionary_from_json(dictionary: &mut Dictionary) -> Result<(), String>{
    let conf_path = "../outer/config/dictionary.json";

    // 读取数据
    let json_data = match fs::read_to_string(conf_path) {
        Ok(contents) => contents,
        Err(_) => String::new(),
    };

    // 解析 JSON 数据为结构体
    let data: Value = serde_json::from_str(json_data.as_str()).unwrap();

    // 获取 keywords 字段
    let keywords = data["keywords"].as_array().unwrap();

    // 将 name 字段的值插入 HashSet
    for keyword in keywords {
        let name = keyword["name"].as_str().unwrap().to_string();
        dictionary.keywords.insert(name);
    }
    // dictionary
    Ok(())
}