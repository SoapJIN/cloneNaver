$(function (){

    let $js_font_size_increase = $('.js--font-size--increase');
    let $js_font_size_decrease = $('.js--font-size--decrease');
    let $js_main_x_scroll= $('.js--main--x-scroll');
    let $js_header_float = $('.js--header--float');

    //! data-include-html--------------
    function includeHtml() {
        const includeTarget = document.querySelectorAll('.includeJs');


        includeTarget.forEach(function(el, idx) {
            const targetFile = el.dataset.includeFile;
            if(targetFile){
                let xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState === XMLHttpRequest.DONE) {
                        this.status === 200 ? (el.innerHTML = this.responseText) : null
                        this.status === 404 ? (el.innerHTML = 'include not found.') : null
                    }
                }

                xhttp.open('GET', targetFile, true);
                xhttp.send();

                return;
            }
        });
    }
    includeHtml();


    //! a태그 href="#" 누를시 스크롤이동 방지------------
    $("a").on("click",function(e) {
        if ($(this).attr("href") == "#") {
            e.preventDefault();
        }
    });








    //! 밑에 "새로운글더보기" 누를시 리스트 더 나오게하기!----------
    let $view_more_btn = $('.js--view-more--button');
    let page_cnt = 4;
    //기본적으로 4개씩 불러오게 하기
    load('.js--group--theme--car',page_cnt,$view_more_btn);
    load('.js--group--theme--sports',page_cnt,$view_more_btn);

    //"새로운글더보기" 버튼 누르면 4개씩 불러오기
    $view_more_btn.on("click",function (){
        //current 있는 page에 id 가져오기!
        let page_id=$(".tab-content.current").attr("id");

        //id에 맞게 더보기 cnt만큼 추가!
        switch (page_id){
            case "car":
                load('.js--group--theme--car',page_cnt,$(this));
                break;
            case "sports":
                load('.js--group--theme--sports',page_cnt,$(this));
                break;
        }
    })


    function load(className,cnt,bth){
        let list = className + ":not(.active)"; //활성 안된 리스트
        let list_length = $(list).length; //활성 안된 리스트 길이
        let list_total_cnt; //총 활성 리스트 개수

        if (cnt < list_length) { // 활성 안된 리스트길이가 cnt보다 크면 총 활성 리스트 개수는 cnt
            list_total_cnt = cnt;
        } else {
            list_total_cnt = list_length; //총 활성 리스트 개수는 활성 안된 리스트 길이
            bth.hide() //리스트 다보여주면 버튼 숨기기
        }
        $(list + ":lt(" + list_total_cnt + ")").addClass("active");
    }


    //체크박스로 체크한게 페이지 새로고침해도 뜨게하기!
    liNewCreate($("input[type=checkbox]:checked"));

    //! 헤더에서 "더보기" 버튼 누르면 밑에 창 뜨게 하기
    let $js_nav_more_button = $('.js--nav--more--button');
    let $js_nav_more_button_icon = $js_nav_more_button.find('i');
    let $js_nav_more_button_txt = $js_nav_more_button.find('span');
    let $js_fav_container_float = $('.js--fav--container--float');
    let $js_layout_header_nav_set = $('.js--layout--header--nav--set');
    let $js_nav_set_button = $('.js--nav--set--button');

    //! 더보기 눌렀을때-----------------
    $js_nav_more_button.on("click",function () {
        console.log($js_nav_more_button_txt.text());
        $('.nav__set__item').eq(2).css("display","none");
        $('.nav__set__item').eq(3).css("display","none");

        //더보기 눌렀을때와 접기 눌렀을때 텍스트,아이콘 변경
        if($js_nav_more_button_txt.text() === "더보기"){
            $js_nav_more_button_txt.text("접기");
            $js_nav_more_button_icon.removeClass("fa-solid fa-chevron-down");
            $js_nav_more_button_icon.addClass("fa-solid fa-chevron-up");
        }else {
            $js_nav_more_button_txt.text("더보기");
            $js_nav_more_button_icon.removeClass("fa-solid fa-chevron-up");
            $js_nav_more_button_icon.addClass("fa-solid fa-chevron-down");
        }

        //버튼 누를때 마다 fav_container,header__nav__set 접었다가 폈다가 함!
        $js_fav_container_float.toggle(0);
        $js_layout_header_nav_set.toggle(0);
    })

    let $empty_box = $('.js--empty--box');

    //더보기 -> 메뉴설정 눌렀을때
    $js_nav_set_button.on('click',function (){
        // 메뉴 설정 눌렀을때 layout__header__nav__list는 none, empty-box__list는 보이게!
        $(".layout__header__nav__list").eq(1).css("display","none");
        $('.empty-box__list').css("display","flex");

        //네이버 프리미엄콘텐츠 -> 프리미엄 콘텐츠로 텍스트 변경
        let $premium=$('input[name="premium"]');
        $premium.parent().contents().each((index,el)=>{
            if(el.textContent === "네이버 프리미엄콘텐츠"){
                el.textContent="프리미엄콘텐츠";
            }
        })

        // 첫번째 리스트 사라지고 두번째 list 보여짐!
        $('.layout__header__nav__list--row').eq(0).css("display","none");
        $('.layout__header__nav__list--row').eq(1).css("display",'grid');

        $('.nav__set__item').eq(0).css("display","none");
        $('.nav__set__item').eq(1).css("display","none");
        $('.nav__set__item').eq(2).css("display","");
        $('.nav__set__item').eq(3).css("display","");

        //메뉴설정 눌렀을때 네모박스에 체크된 텍스트 채워지게!
        emptyBoxChangeText($("input[type=checkbox]:checked"));

        //메뉴설정 -> 접기 눌렀을때
        $js_nav_more_button.on("click",function (){
            $('.nav__set__item').eq(0).css("display","");
            $('.nav__set__item').eq(1).css("display","");
            $('.layout__header__nav__list--row').eq(0).css("display","grid");
            $('.layout__header__nav__list--row').eq(1).css("display",'none');
            $('.empty-box__list').css("display","none");
            $('.layout__header__nav__list').eq(1).css("display","flex");
        })

        //checkbox가 변할 때 마다
        $("input[type=checkbox]").change(function (){
            let $selectedEls = $("input.nav__checkbox:checked");
            console.log("checkbox change--------");
            console.log($selectedEls,"change $selectedEls");

            //empty_box에 $selectedEls에 있는 text값 넣기!
            emptyBoxChangeText($selectedEls);

            //check가 4개 보다 많아지면 체크 못하게 설정!
            if($selectedEls.length > 4) {
                this.checked=false;
                alert("최대 4개까지 설정 가능합니다.")
            }
        })
    })

    //메뉴설정 -> 초기화
    let $button_reset = $('.js--nav--set--button--reset');

    $button_reset.on('click',function (){
        //체크 전체 해제
        $("input.nav__checkbox:checked").each((index,i)=>{
            $(i).prop("checked",false);
        });

        //초기화시 박스형태로 돌아감!
        $empty_box.each((index,el)=>{
            $(el).text("");
            $(el).parent().css("border","");
            $(el).parent().css("padding","");
        });
        liNewCreate($("input.nav__checkbox:checked"));

        alert("초기화 되었습니다!");
        navChangeCss();
    })

    //메뉴설정 -> 저장
    let $button_save = $('.js--nav--set--button--save');
    $button_save.on("click",function (){
        console.log("$button__save click--------");
        liNewCreate($("input.nav__checkbox:checked"));
        navChangeCss();
    })

    function navChangeCss(){
        $('.layout__header__nav__list').eq(1).css("display","flex");
        $('.empty-box__list').css("display","none");
        $('.layout__header__nav__list--row').eq(0).css("display","grid");
        $('.layout__header__nav__list--row').eq(1).css("display",'none');


        $('.nav__set__item').eq(0).css("display","");
        $('.nav__set__item').eq(1).css("display","");

        $('.nav__set__item').eq(2).css("display","none");
        $('.nav__set__item').eq(3).css("display","none");
    }

    //nav_list 안에 li를 새로 만듬!
    function  liNewCreate(navList){
        console.log(navList,"navList liNewCreate()")
        if(navList.length>0){
            let a = 0;
            $(".layout__header__nav__list").eq(1).html("");
            $(navList).each((index,el)=>{
                console.log("index:",index," el:",$(el).parent().text(),"liNewCreate");
                let text = $(el).parent().text();
                $(".layout__header__nav__list").eq(1).append("<li class=\"nav__item\">"+'<a href=\"'+a+"\"><p>"+text+"</p></a></li>");
            })
        }else {
            //만약 체크된게 하나도 없으면 원래대로 돌아옴!
            $(".layout__header__nav__list").eq(1).html("<li class=\"nav__item\"><a href=\"#\"><p>사전</p></a></li>\n" +
                "                            <li class=\"nav__item\"><a href=\"#\"><p>뉴스</p></a></li>\n" +
                "                            <li class=\"nav__item\"><a href=\"#\"><p>부동산</p></a></li>\n" +
                "                            <li class=\"nav__item\"><a href=\"#\"><p>지도</p></a></li>\n" +
                "                            <li class=\"nav__item\"><a href=\"#\"><p>VIBE</p></a></li>\n" +
                "                            <li class=\"nav__item\"><a href=\"#\"><p>도서</p></a></li>\n" +
                "                            <li class=\"nav__item\"><a href=\"#\"><p>웹툰</p></a></li>");
        }
    }

    //$empty_box에 $selectedEls-element의 text 넣어짐!
    function emptyBoxChangeText(navList) {
        let $empty_box = $('.js--empty--box');
        console.log(navList,"navList empty_box_changeText()")

        $empty_box.each((index,el)=>{ //each문 쓰면 jQuery 객체가 아니라 DOM 엘리먼트이므로 el -> $(el)으로 jquery객체로 만들어줌
            $(el).text($(navList).eq(index).parent().text());
            console.log("index:",index," el:",$(el).text(),"empty_box_changeText()");

            //텍스트가 있으면 border,padding 0으로 바꾸고 아니면
            if($(el).text()){
                $(el).parent().css("border","none");
                $(el).parent().css("padding","0");
            }else {
                $(el).parent().css("border","");
                $(el).parent().css("padding","");
            }
        });
        console.log("====================")
    }



    //! 화살표버튼 누를시 carousel 무한 회전--------------
    let $js_button_prev_03=$('.js--button--prev--03');
    let $js_button_next_03=$('.js--button--next--03');
    const $car_list = $('.js--car--list');
    const car_list_width = $car_list.width();
    let num = 0;

    $js_button_next_03.on("click",function (){
        changePosition("next");
    })

    $js_button_prev_03.on("click",function (){
        changePosition("prev");
    })

    function changePosition (type) {
        switch (type) {
            case "prev":
                console.log("들어와?????prev");
                num = num - (-car_list_width);

                //첫번째에서 prev버튼 누를시 마지막 x좌표로 가기!
                num = (num>0) ? -(car_list_width * ($car_list.length-1)) : num;
                break;

            case "next":
                console.log("들어와?????next");
                num = num + (-car_list_width);

                //마지막에서 next 누를시 처음 x좌표로 가기!
                num = (num === -(car_list_width * $car_list.length)) ? 0 : num;
                break;
        }

        $car_list.css("transform","translateX("+num+"px)");
    }



    //! carousel 누를시 그거에 맞는 페이지 나옴!---------------
    const today_reco_items = document.querySelectorAll('.today__reco-writing__item');
    let $js_button_prev_02=$('.js--button--prev--02');
    let $js_button_next_02=$('.js--button--next--02');
    let page =0; //현재 보는 페이지

    $('ul.today__reco-writing__list li').on("click",function(){ //tab 버튼 클릭시
        tab_page_move(this);
    });

    $($js_button_prev_02).on("click",function (){
        pageCheck();
        tab_page_move(today_reco_items[--page]);
    })

    $($js_button_next_02).on("click",function (){
        pageCheck();
        tab_page_move(today_reco_items[++page]);
    })

    //current 몇번째인지
    function pageCheck (){
        today_reco_items.forEach((el,count)=> {
            if($(el).attr("class")==='today__reco-writing__item current') {
                page=count;
            }
            count++;
        });
    }

    //tab버튼 눌렀을때 current 붙이고나서 pageCheck()를 하는거지! -> buttonHideShow() 실행
    function tab_page_move (item) {
        console.log(item);
        let $view_more_btn = $('.js--view-more--button');

        let tab_id = $(item).attr('data-tab'); //누른 tab 버튼의 속성 'data-tab'에서 데이터 가져오기

        $('ul.today__reco-writing__list li').removeClass('current');  // 버튼 누르면 모든 li classname "current" 삭제
        $('.tab-content').removeClass('current');

        $(item).addClass('current'); //누른 li에 classname "current" 생성
        $("#"+tab_id).addClass('current'); //누른 tab버튼의 data-tab의 값이랑 tab-content에 id가 같으면 "current" 생성

        pageCheck();
        buttonHideShow($js_button_prev_02,$js_button_next_02,page,today_reco_items);

        //page 0~6일때는 'translateX(0)', page >= 7 일때는 'translateX(-183px)'
        if(page >= 7) {
            $('ul.today__reco-writing__list').css('transform','translateX(-183px)');
        }else {
            $('ul.today__reco-writing__list').css('transform','translateX(0)');
        }
    }



    //! prev,next 버튼 누르면 페이지 변경---------
    let $js_button_prev=$('.js--button--prev');
    let $js_button_next=$('.js--button--next');



    function example(){
        let current_page = 0;
        let row_cnt= 6;
        let column_cnt= 4;
        let total_item_cnt = $(".news-stand__item").length;
        let total_list_cnt =  $(".news-stand__list").length;
        let total_page_cnt = total_item_cnt / (row_cnt * column_cnt);

        let $current_page_txt = $('.js--current-page--txt').text();
        let $total_page_txt = $('.js--total-page--txt').text();
        console.log(total_item_cnt,total_page_cnt);
    }

    example();

    const $news_stand_list = $('.news-stand__list');
    let now =0; //현재 보는 페이지
    $news_stand_list.hide().first().show(); //첫번째 아이템 보여주기!
    buttonHideShow($js_button_prev,$js_button_next,0); //0번째 일때 prev 버튼 사라지기!

    $js_button_next.on("click",function (){
        loadPage("next");
    });

    $js_button_prev.on("click",function (e) {
        loadPage("prev");
    });

    function loadPage(type){
        $news_stand_list.eq(now).hide(); //버튼 누르시 현재페이지 숨기기

        switch (type) {
            case "next":
                now = (now + 1 < $news_stand_list.length) ? now + 1 : now;  //next 누를때 조건문 만족시에 +1 페이지
                break;
            case "prev":
                now = (now > 0) ? now - 1 : 0; //prev 누를때 조건문 만족시에 -1 페이지
                break;
        }

        $news_stand_list.eq(now).show(); //show next
        buttonHideShow($js_button_prev,$js_button_next,now,$news_stand_list);
    }

    //버튼 숨기고, 나타나게 하는 함수
    function buttonHideShow (prev_button,next_button,now,list) {
        if(now === 0) {
            console.log("처음");
            prev_button.hide();
            next_button.show();
        } else if(now === list.length-1) {
            console.log("마지막");
            next_button.hide();
            prev_button.show();
        } else {
            next_button.show();
            prev_button.show();
        }
    }



    //! scroll__wrap 수평스크롤 할시에 "header-검색창" 나타남----------
    $js_main_x_scroll.scroll( function () {
        reveal(this);
    });

    function reveal(x) {
        let scroll_item_home = document.querySelector(".x-scroll__container__item--home");
        //윈도우 창 너비
        let windowWidth = window.innerWidth;
        //! getBoundingClientRect() : top, bottom, left, right, x, y, width, height
        //home의 x 값 (0 ~ -windowWidth)
        let elementX = scroll_item_home.getBoundingClientRect().x;
        //윈도우너비에서 scrollLeft 뺀 값 (windowWidth ~ 0)
        let scroll_right = windowWidth - $(x).scrollLeft();
        let scroll_percent =  Math.round(scroll_right * 100 / windowWidth);


        // $js_header_float에 translateY(-100% ~ 0 %) 적용
        $js_header_float.css('transform', 'translateY(' + -scroll_percent + '%)');


        // 만약 elementX가 -windowWidth 보다 작아지면 "header-검색창" 고정, 0이면 css 삭제
        if(elementX < -windowWidth) {
            $js_header_float.css('transform', 'translateY(' + 0 + '%)');
        } else if(elementX === 0) {
            $js_header_float.css('transform', '');
        }


        //만약 document-scroll-top이 home-검색창-top보다 아래 있을시 적용
        if( $(document).scrollTop() > $('.home__search').offset().top) {

            //만약 elementX가 -windowWidth보다 작아지면 "header-검색창" 고정
            //아니면 -windowWidth보다 커지면 css 삭제
            if(elementX < -windowWidth ) {
                $js_header_float.css('transform', 'translateY(' + 0 + '%)');
            }else if (elementX > -windowWidth){
                $js_header_float.css('transform', '');
            }
        }
    }


    //! header에 메뉴 클릭시 메뉴창 나타남-------------
    $('.js--header--menu').on("click",function (){
        $('.js--home-side--container').addClass('menu--fixed');
        $('html').css('overflow','hidden');
    })

    $('.js--side--button--close').on("click",function (){
        $('.js--home-side--container').removeClass('menu--fixed');
        $('html').css('overflow','');
    })


    let search_offset = $('.home__search').offset();
    let header_search_Offset = $('.layout__header__search__container').offset();
    let scroll_item_home = document.querySelector(".x-scroll__container__item--home");
    let elementX = scroll_item_home.getBoundingClientRect().x;


    //! 중간에서 새로고침시 "header-검색창" 고정----------
    searchFloat(search_offset,elementX);


    //! home에서 스크롤시 "header-검색창" 생성,사라짐-----------
    $(window).scroll(function (){
        searchFloat(search_offset,elementX);
        searchFloat(header_search_Offset,0);
    })

    function searchFloat(offset,x) {
        let windowWidth = window.innerWidth;
        let elementX = scroll_item_home.getBoundingClientRect().x;
        // 만약 scroll이 home페이지에 있는 search보다 낮아지거나 home의 x값이 -(창너비)랑 같거나 작을때 고정됨
        if ( $(document).scrollTop() > offset.top || x <= -windowWidth){
            $js_header_float.css("display","unset");
            $js_header_float.addClass('header--fixed');

        // 만약 home페이지 x값이 0이고 scroll이 search보다 높으면 클래스이름 삭제
        } else if( x === 0 && $(document).scrollTop() < offset.top){
            $js_header_float.removeClass("header--fixed")
        }
    }

    //! 폰트사이즈 설정-------------
    $js_font_size_increase.on("click", {data1:$js_font_size_decrease,size:"+1"},setFontSize);
    $js_font_size_decrease.on("click", {data1:$js_font_size_increase,size:"-1"},setFontSize);

    function setFontSize(x){
        const html= $("html");
        let currentFontSize= (parseInt(html.css("font-size")));

        let totalFontSize= currentFontSize+ parseInt(x.data.size);

        html.css("font-size",totalFontSize+"px");

        if(totalFontSize >= 12) {
            $js_font_size_increase.attr("disabled",true);
            $js_font_size_increase.css("background-color","gray");
        }

        if(totalFontSize <= 8){
            $js_font_size_decrease.attr("disabled",true);
            $js_font_size_decrease.css("background-color","gray");
        }

        if(x.data.data1.prop("disabled")===true){
            x.data.data1.attr("disabled",false);
            x.data.data1.css("background-color","white");
        }
    }

})