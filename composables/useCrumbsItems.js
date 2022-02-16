import {useState} from "#app";

export const useCrumbsItems = () => useState('crumbs', () => []);