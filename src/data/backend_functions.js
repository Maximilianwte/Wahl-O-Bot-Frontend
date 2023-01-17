import axios from "axios";
let function_suffix = "/.netlify/functions";
let activeURL = process.env.VUE_APP_URL_PREFIX;

let logic_functions = {
  get_ip() {
    // You need the proxy in netlify TOML to work.
    return axios.get("/api/get_ip").then(response => {
      return response
  })},
  send_statement(statement) {
    return axios.post(activeURL + function_suffix + "/ml/predict", statement).then(response => {
      return response
    })
  },
  get_allowance() {
    return axios.get(activeURL + function_suffix + "/data/check_allowance").then(response => {
      return response
  })},
  send_statement_db(statement) {
    return axios.post(activeURL + function_suffix + "/data/send_statement", statement).then(response => {
      return response
  })},
  send_useful_feedback(data) {
    return axios.post(activeURL + function_suffix + "/data/send_useful", data).then(response => {
      return response
  })},
  send_text_feedback(data) {
    return axios.post(activeURL + function_suffix + "/data/send_feedback", data).then(response => {
      return response
  })},
  send_request_more_information(data) {
    return axios.post(activeURL + function_suffix + "/data/send_request_more_information", data).then(response => {
      return response
  })
  },
  collect_request_more_information(data) {
    return axios.post(activeURL + function_suffix + "/data/collect_request_more_information", data).then(response => {
      return response
  })
  }
}



export default logic_functions