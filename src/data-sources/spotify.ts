import { RESTDataSource } from "@apollo/datasource-rest";
import { stringify } from "querystring";
import { Response } from "express";

export default class SpotifyApi extends RESTDataSource {}
