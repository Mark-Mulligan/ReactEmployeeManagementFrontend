import axios from 'axios';

const getData = async (url) => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

export default getData;