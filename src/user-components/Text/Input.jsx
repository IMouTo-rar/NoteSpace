import React from 'react';
import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api';
import './Input.css';

function Input() {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        // 更新输入框内容
        setInputValue(e.target.textContent);
    };

    return (
        <div className='input-block'>
            <div
                contentEditable={true}
                spellCheck={false}
                onInput={handleChange}
            >
            </div>
            <Autocomplete input={inputValue} />
        </div>
    );
}

function Autocomplete({ input }) {
    const [autocomplete, setAutocomplete] = useState([]);

    useEffect(() => {
        const autocomplete = async () => {
            await invoke("autocomplete", { input: input })
                .then((res) => {
                    setAutocomplete(res); 
                    console.log(res);
                })
                .catch((err) => { console.log(err); });
        };
        autocomplete();
    }, [input]);

    return (
        <div className='autocomplete-block'>
            {autocomplete.map((item, index) => (
                <div key={index}>{item}</div>
            ))}
        </div>
    );
}

export default Input;