const api_uri = "http://api.likeweb.co.kr/";
// const api_uri = "http://api.clearlasik.kr/";

exports.enum_api_uri = {
    api_uri: `${api_uri}`,

    // 공통  -------------------------------------------
    login: `${api_uri}v1/auth/login`,

    //게시판
    board_list: `${api_uri}v1/board/:category/:limit`,
    board_move: `${api_uri}v1/board/move`,
    board_modify: `${api_uri}v1/board/`,
    notice_setting: `${api_uri}v1/board/notice`,
    board_detail: `${api_uri}v1/board/view/:category/:idx`,
    board_file: `${api_uri}v1/board/file`,
    board_file_down: `${api_uri}v1/board/download/:category/:parent_idx/:idx`,
    board_reply: `${api_uri}v1/board/reply`,
    //게시판분류
    board_group_list: `${api_uri}v1/admin/menu/boardGroup/:parent_id`,
    board_group: `${api_uri}v1/admin/menu/boardGroup`,
    board_group_view: `${api_uri}v1/admin/menu/boardGroup/view/:id`,
    board_group_move: `${api_uri}v1/admin/menu/boardGroupMove`,
    //게시판댓글
    board_comment_list: `${api_uri}v1/comment/user/:category/:board_idx`,
    board_comment: `${api_uri}v1/comment/user`,



    // 사용자단 ------------------------------------------
    //팝업
    auth_popup_list: `${api_uri}v1/auth/popup/`,


    // 관리자단 ------------------------------------------
    //메인
    main_board_cnt: `${api_uri}v1/admin/first/board-cnt`,
    main_board_list: `${api_uri}v1/admin/first/board-list/:limit`,
    main_connector_cnt: `${api_uri}v1/admin/first/connector-cnt`,
    main_connector_list: `${api_uri}v1/admin/first/connector-list/:limit`,
    board_menu_list: `${api_uri}v1/admin/first/board-name`,
    alarm_list: `${api_uri}v1/admin/first/alarm-cnt/:follow`,
    alarm_modify: `${api_uri}v1/admin/first/alarm-read-delete/`,

    //메뉴관리
    menu_list: `${api_uri}v1/admin/menu`,
    menu_sub_detail: `${api_uri}v1/admin/menu/sub/:id`,
    menu_sub: `${api_uri}v1/admin/menu/sub`,
    
    //게시판관리 - 댓글관리
    comment_list: `${api_uri}v1/comment/admin`,

    //회원관리 - 회원관리
    member_list: `${api_uri}v1/admin/member/list/:m_level`,

    member_cancel_list: `${api_uri}v1/admin/member/sec`,

    //디자인관리 - 메인배너관리
    banner_list: `${api_uri}v1/admin/banner`,
    banner_open: `${api_uri}v1/admin/banner/open`,
    banner_detail: `${api_uri}v1/admin/banner/:idx`,
    banner_move: `${api_uri}v1/admin/banner/move`,
    //디자인관리 - 팝업관리
    popup_list: `${api_uri}v1/admin/popup`,
    popup_open: `${api_uri}v1/admin/popup/open`,
    popup_detail: `${api_uri}v1/admin/popup/:idx`,

    //환경설정
    site_info: `${api_uri}v1/admin/config/site/:site_id`,
    site_info_modify: `${api_uri}v1/admin/config/site`,
    site_policy: `${api_uri}v1/admin/config/policy`,
    policy_use: `${api_uri}v1/admin/config/policy/use`,
    policy_detail: `${api_uri}v1/admin/config/policy/:idx`,
    policy_modify: `${api_uri}v1/admin/config/policy/`,
    level_list: `${api_uri}v1/admin/config/level`,

    //유지보수
    maint_list: `${api_uri}v1/admin/maintenance/list/:category`,
    maint_detail: `${api_uri}v1/admin/maintenance/view/:category/:list_no`,
    maint_comment_list: `${api_uri}v1/admin/maintenance/comment/:list_no`,
    maint_comment: `${api_uri}v1/admin/maintenance/comment`,
    maint_create: `${api_uri}v1/admin/maintenance/create`,
    maint_file_down: `${api_uri}v1/admin/maintenance/download/:list_no`,



}