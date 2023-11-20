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
    board_detail: `${api_uri}board/view/:category/:idx`,
    board_file: `${api_uri}board/file`,
    board_file_down: `${api_uri}board/download/:category/:parent_idx/:idx`,
    board_reply: `${api_uri}board/reply`,
    //게시판분류
    board_group_list: `${api_uri}admin/menu/boardGroup/:parent_id`,
    board_group: `${api_uri}admin/menu/boardGroup`,
    board_group_view: `${api_uri}admin/menu/boardGroup/view/:id`,
    board_group_move: `${api_uri}admin/menu/boardGroupMove`,
    



    // 관리자단 ------------------------------------------
    //메인
    main_board_cnt: `${api_uri}admin/first/board-cnt`,
    main_board_list: `${api_uri}admin/first/board-list/:limit`,
    main_connector_cnt: `${api_uri}admin/first/connector-cnt`,
    main_connector_list: `${api_uri}admin/first/connector-list/:limit`,
    board_menu_list: `${api_uri}admin/first/board-name`,
    alarm_list: `${api_uri}admin/first/alarm-cnt/:follow`,
    alarm_modify: `${api_uri}admin/first/alarm-read-delete/`,

    //메뉴관리
    menu_sub_detail: `${api_uri}admin/menu/sub/:id`,
    menu_sub: `${api_uri}admin/menu/sub`,

    //디자인관리
    popup_list: `${api_uri}admin/popup`,
    popup_open: `${api_uri}admin/popup/open`,
    popup_detail: `${api_uri}admin/popup/:idx`,


    //환경설정
    site_info: `${api_uri}admin/config/site/:site_id`,
    site_info_modify: `${api_uri}admin/config/site`,
    site_policy: `${api_uri}admin/config/policy`,
    policy_use: `${api_uri}admin/config/policy/use`,
    policy_detail: `${api_uri}admin/config/policy/:idx`,
    policy_modify: `${api_uri}admin/config/policy/`,
    level_list: `${api_uri}admin/config/level`,


    //유지보수
    maint_list: `${api_uri}admin/maintenance/list/:category`,
    maint_detail: `${api_uri}admin/maintenance/view/:category/:list_no`,
    maint_comment_list: `${api_uri}admin/maintenance/comment/:list_no`,
    maint_comment: `${api_uri}admin/maintenance/comment`,
    maint_create: `${api_uri}admin/maintenance/create`,
    maint_file_down: `${api_uri}admin/maintenance/download/:list_no`,



}