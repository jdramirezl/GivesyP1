import * as React from "react";
import { baseURL } from "../config";
import axios from "axios";
import { useQuery } from "react-query";

export async function Create<T extends { id?: number }>(
	name: string,
	body: object,
	config?: object
) {
	return await axios.post<T>(`${baseURL}api/${name}/`, body, config);
}

export async function Update<T extends { id?: number }>(
	name: string,
	body: object,
	id: number,
	config?: object
) {
	await axios.put<T>(`${baseURL}api/${name}/${id}/`, body, config);
}

export async function FetchAll<T>(name: string, config?: object) {
	return await axios.get<T[]>(`${baseURL}api/${name}/`, config);
}

export async function Fetch<T>(name: string, id: number, config?: object) {
	return await axios.get<T>(`${baseURL}api/${name}/${id}/`, config);
}

export async function Delete<T>(name: string, id: number) {
	return await axios.delete<T>(`${baseURL}api/${name}/${id}/`);
}
