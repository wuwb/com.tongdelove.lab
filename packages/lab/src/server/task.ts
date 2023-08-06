import axios from "@/utils/axios";

export async function getRencentTasks() {
    let { data } = await axios.get('/freelancer/tasks');

    return data.data;
}
