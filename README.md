# axiosQ
Queue concurrent requests for [axios][1] with interceptors.

## Installation
axiosQ is available as a package on NPM for use with a module bundler or in a Node application:

```bash
npm install @qaz7456/axios-concurrent-queue
```

## What's Included
- **How many ways can axiosQ be used?**
  ```js
  axiosQ(axios);
  axiosQ(axios, MAX_CONCURRENT);
  ```
- **What do we pass to axiosQ as an argument?**

  `axios`: An instance of axios.
  
  `MAX_CONCURRENT`: An optional parameter to control the number of concurrent requests, the default is 1.
- **What does axiosQ return?**

  `axios`: An instance of axios.
  
  `detach`: A function, will eject the request and response handlers from axios instance.

## Usage
```js
import axios from 'axios';
import { axiosQ } from '@qaz7456/axios-concurrent-queue';

const control = axiosQ(axios.create({
  baseURL: BASE_API,
  withCredentials: true
}));

const axiosInstance = control.axios;
```

## License
*compression-app* is Apache-2.0 licensed, as found in the [LICENSE][2] file.

[1]: https://github.com/axios/axios
[2]: https://github.com/qaz7456/axios-concurrent-queue/blob/HEAD/LICENSE