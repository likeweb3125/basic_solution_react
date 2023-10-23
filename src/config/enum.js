const api_uri = "http://api.likeweb.co.kr/v1/";

exports.enum_api_uri = {
    api_uri: `${api_uri}`,

    //관리자단 -------------------------------------------
    login: `${api_uri}auth/login`,

    // 환경설정
    site_info: `${api_uri}admin/config/site/:site_id`,



}