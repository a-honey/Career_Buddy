import axios from 'axios';

export const updateData = (id, name, data) => {
    return axios.put(`/api/${id}/${name}`, data);
}