
import fetch from 'node-fetch';
// import axios from "axios"
// import express from 'express';

export const fetchData = async (polygons) => {
    try {
        const p = JSON.stringify(polygons)
        // console.log(JSON.parse(p)) -->opposite of stringify

        const url = `https://jzopla5jwrclfx6gcfuxl7c37m0fgfpl.lambda-url.us-east-2.on.aws/?polygons=${p}`
        console.log(url)
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        const result = await response.json();
        return result;
      } catch (err) {
        console.log(err);
      }
  }

