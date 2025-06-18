const workerUrl = 'https://json-api.txdygl.workers.dev';
const key = 'data';
// 保存 JSON 数据
export async function saveJson(value: object) {
    const url = `${workerUrl}/save`;
    const data = { key: key, value: value };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.text();
        console.log('Data saved:', result);
        alert('saveJson success');
        return result;
    } catch (error) {
        console.error('Failed to save data:', error);
        alert('saveJson failed');
        return null;
    }
}

// 获取 JSON 数据
export async function getJson() {
    const url = `${workerUrl}/get?key=${key}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        console.log('Data retrieved:', json);
        return json;
    } catch (error) {
        console.error('Failed to retrieve data:', error);
        alert('getJson failed');
        return null;
    }
}
