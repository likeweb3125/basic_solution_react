const api_uri = "http://api.likeweb.co.kr:5001/v1/";

exports.enum_api_uri = {
    api_uri: `${api_uri}`,

    // 공통  -------------------------------------------
    login: `${api_uri}auth/login`,

    //게시판
    board_list: `${api_uri}board/:category/:limit`,
    board_move: `${api_uri}board/move`,
    board_modify: `${api_uri}board/`,
    notice_setting: `${api_uri}board/notice`,



    // 관리자단 ------------------------------------------
    //메인
    main_board_cnt: `${api_uri}admin/first/board-cnt`,
    main_board_list: `${api_uri}admin/first/board-list/:limit`,
    main_connector_cnt: `${api_uri}admin/first/connector-cnt`,
    main_connector_list: `${api_uri}admin/first/connector-list/:limit`,
    board_menu_list: `${api_uri}admin/first/board-name`,
    alarm_list: `${api_uri}admin/first/alarm-cnt/:follow`,
    alarm_modify: `${api_uri}admin/first/alarm-read-delete/`,


    

    // 환경설정
    site_info: `${api_uri}admin/config/site/:site_id`,
    site_info_modify: `${api_uri}admin/config/site`,



}