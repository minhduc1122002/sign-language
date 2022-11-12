'use strict';

const fs = require('fs');
let rawdata = fs.readFileSync('data/WLASL_v0.3.json');
export default data = JSON.parse(rawdata);