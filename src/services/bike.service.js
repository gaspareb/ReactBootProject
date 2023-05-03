import http from "../http-common";

class BikeDataService {
  getAll() {
    return http.get("/bikes");
  }

  get(id) {
    console.log("get=>" + id)
    return http.get(`/bikes/bike/${id}`);
  }

  getBike(id) {
    console.log("get=>" + id)
    return http.get(`/bikes/getbike/${id}`);
  }

  create(data) {
    return http.post("/bikes", data);
  }

  update(id, data) {
    return http.put(`/bikes/${id}`, data);
  }

  delete(id) {
    return http.delete(`/bikes/${id}`);
  }

  deleteAll() {
    return http.delete(`/bikes`);
  }

  findByTitle(id) {
    console.log("findByTitle=>" + id);
    return http.get(`/bikes/bike/${id}`);
  }
}

export default new BikeDataService();