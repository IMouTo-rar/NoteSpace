use std::fs;
use std::borrow::Cow;
use std::cmp::Ordering;
use std::collections::HashSet;
use serde::{Deserialize, Serialize};
use serde_json::Value;

// 自动补全字典
pub struct Dictionary<'a> {
    keywords: HashSet<Keyword<'a>>,
}

impl<'a> Dictionary<'a> {
    
}

// Keyword 结构体
#[derive(Serialize, Deserialize)]
struct Keyword<'a> {
    id: i32,
    tag: i32,
    name: &'a str,
    description: &'a str,
    icon: &'a str,
}

impl<'a> Ord for Keyword<'a> {
    fn cmp(&self, other: &Self) -> Ordering {
        match self.tag.cmp(&other.tag) {
            Ordering::Equal => self.id.cmp(&other.id),
            ordering => ordering,
        }
    }
}

impl<'a> PartialOrd for Keyword<'a> {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl<'a> PartialEq for Keyword<'a> {
    fn eq(&self, other: &Self) -> bool {
        self.tag == other.tag && self.id == other.id
    }
}

impl<'a> Eq for Keyword<'a> {}

// 从json中加载字典
fn load_dictionary_from_json<'a>(dictionary: &mut Dictionary) -> Result<(), String>{
    let conf_path = "../outer/config/dictionary.json";

    let json_data = match fs::read_to_string(conf_path) {
        Ok(contents) => contents,
        Err(_) => String::new(),
    };

    let data: Cow<str> = json_data.into();

    // 读取数据
    todo!();

    Ok(())
}