import * as React from "react";
import { baseURL } from "../config";
import axios from "axios";
import { useQuery } from "react-query";



export function FetchAll<T> (name: string) {
    const fetch = async () => {
        const res = await axios.get<T[]>(`${baseURL}api/${name}/`);
        return res.data;
    };
    const {data} = useQuery(`${name}`, fetch);
    return data;
};

export function Fetch<T> (name: string) {
    const fetch = async () => {
        const res = await axios.get<T>(`${baseURL}api/${name}/`);
        return res.data;
    };
    const {data} = useQuery(`${name}`, fetch);
    return data;
};