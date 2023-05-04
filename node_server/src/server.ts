/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import express, { Request, Response } from "express";
import axios from "axios";

import { USA_PLACE_DCID } from "../../static/js/shared/constants";

const app = express();
const port = process.env.PORT || 3030;

app.get("/", (req: Request, res: Response) => {
  const query = req.query.q;
  axios
    .post(`http://127.0.0.1:8080/nl/data?q=${query}`)
    .then((resp) => {
      res.send(resp.data);
    })
    .catch((error) => {
      console.error("Error making request:\n", error.message);
      res.status(500).send("Failed to make a request to the target service.");
    });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
