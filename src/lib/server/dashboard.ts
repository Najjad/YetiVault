import axios from 'axios';

export async function breachCheck(email: string): Promise<any> {
    const apiUrl = `https://leakcheck.io/api/public?check=` + email;

    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching data from LeakCheck API:', error);
        throw new Error('Failed to fetch data from LeakCheck API');
    }
}