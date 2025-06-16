let API_KEY = '$2a$10$UHk4r3Qzimqfts1zhv.C';
API_KEY += 'M.qOkpGA7qP0nMNitX20L8RmSjZvFAlHu';
const BIN_ID = '684fe2b68561e97a50251652';

export async function saveJsonToJSONBin(value: object) {
    const url = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

    const response = await fetch(url, {
        method: 'PUT',  // PUT 用于更新整个 bin
        headers: {
            'Content-Type': 'application/json',
            'X-Access-Key': API_KEY
        },
        body: JSON.stringify(value)
    });

    if (!response.ok) {
        throw new Error(`保存失败: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('保存成功:', result);
    return result;
}

export async function getDataFromJSONBin() {
    const url = `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`;

    const response = await fetch(url, {
        headers: {
            'X-Access-Key': API_KEY
        }
    });

    if (!response.ok) {
        if (response.status === 404) {
            // bin 为空或不存在，返回空对象
            return {};
        }
        throw new Error(`读取失败: ${response.statusText}`);
    }

    const result = await response.json();
    return result.record;
}
