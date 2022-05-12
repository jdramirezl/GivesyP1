import * as React from "react";
import { baseURL } from "../config";
import axios from "axios";
import { useQuery } from "react-query";

export async function Create<T>(name: string, body: object) {
	return await axios.post<T>(`${baseURL}api/${name}/`, body);
}

export async function Update<T>(name: string, body: object, id: number) {
	return await axios.put<T>(`${baseURL}api/${name}/${id}/`, body);
}

export function FetchAll<T>(name: string) {
	const fetch = async () => {
		const res = await axios.get<T[]>(`${baseURL}api/${name}/`);
		return res.data;
	};
	const { data } = useQuery(`${name}`, fetch);
	return data;
}

export function Fetch<T>(name: string) {
	const fetch = async () => {
		const res = await axios.get<T>(`${baseURL}api/${name}/`);
		return res.data;
	};
	const { data } = useQuery(`${name}`, fetch);
	return data;
}
