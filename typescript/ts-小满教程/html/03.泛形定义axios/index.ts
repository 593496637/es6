const axios = {
  get<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.open('get', url);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        }
      };
      xhr.send();
    });
  },
};

interface Data {
  success: boolean;
  message: string;
}

axios.get<Data>('./data.json').then((res) => {
  console.log(res.message, res.success);
});
