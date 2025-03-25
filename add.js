        <script>
            document.addEventListener("DOMContentLoaded", () => {
                // `document.body` の変化を監視（子要素の追加・削除を検知）
                const observer = new MutationObserver(() => {
                    const nav = document.querySelector('nav.qti-navigator-tree');
                    if (nav) {
                        console.log('ターゲットが見つかりました', nav);

                        nav.style.maxWidth = '220px';
                        // 既存の MutationObserver を停止（不要な監視を防ぐ）
                        observer.disconnect();

                        // `target` に対する新しい MutationObserver を作成
                        const targetObserver = new MutationObserver(records => {

                            var span_title = nav.querySelector('ul').querySelector('li').querySelector('.qti-navigator-label');
                            span_title.style.display="none";

                            let uls =document.querySelectorAll("ul.qti-navigator-items.collapsible-panel.plain");

                            let i = 1;
                            uls.forEach((e)=>{
                                var ul = e;
                                Array.from(ul.children).forEach((elm, key)=>{
                                    var elm_number = i;
                                    i++;

                                    var span = elm.querySelector('span');
                                    span.innerHTML = span.innerHTML.replace(span.title, elm_number);                                    
                                    var nav_label = span.querySelector('span.qti-navigator-icon')
                                    if(nav_label){nav_label.style.display="none";}

                                    elm.style.display='inline-block';
                                    elm.style.borderRadius="50%";
                                    elm.style.padding="5px 10px";
                                    elm.style.margin="5px";
                                    
                                    elm.classList.remove("unseen","disabled","collapsed","qti-navigator-label","collapsible");
                                    elm.classList.add("viewed");
                                    elm.parentElement.parentElement.classList.remove("collapsible","collapsed");
                                    elm.parentElement.parentElement.classList.add("active");
                                    elm.parentElement.style.display="inline";
                                    elm.parentElement.parentElement.style.display="inline";
                                    elm.parentElement.parentElement.querySelector('span.qti-navigator-label').style.display="none";
                                })
                            });
                        });
                        // `target` を監視
                        targetObserver.observe(nav, { attributes: true });
                    }
                });

                // 監視の開始
                observer.observe(document.body, { childList: true, subtree: true });
            });

            const footer_change = () =>{

            }


            function handleFooterChanges(div) {
                console.log('handleFooterChanges 発火', div);
                div.style.paddingBottom="60px";
                div.children[0].style.height="70px";



                const skip = div.querySelector('li[data-control="skip"]');
                if (skip) {
                    skip.style.display = "none";
                }

                const lis = div.querySelectorAll('li');
                lis.forEach((el,key)=>{
                    el.style.height="60px";
                })

                const icon = div.querySelector('li[data-control="move-forward"] .icon');
                if (icon) {
                    icon.style.display = "none";
                }

                const icon_text = div.querySelector('li[data-control="move-forward"] .text');
                if (icon_text) {
                    icon_text.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/></svg>';

                    //icon_text.innerHTML = "<span style='color:#266d9c;background-color:white;padding:0 10px 2px 8px;border-radius:50%;width:30px;display:inline-block;font-size:24px;font-weight:bold'>&#8594;</span>";
                }

                const back_icon = div.querySelector('li[data-control="move-backward"] .icon');
                if (back_icon) {
                    back_icon.style.display = "none";
                }
                const back_icon_text = div.querySelector('li[data-control="move-backward"] .text');
                if (back_icon_text) {
                    back_icon_text.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/></svg>'
                    //back_icon_text.innerHTML = "<span style='color:#266d9c;background-color:white;padding:0 10px 2px 8px;border-radius:50%;width:30px;display:inline-block;font-size:24px;font-weight:bold'>&#8592;</span>";
                }


                const skip_end = div.querySelector('li[data-control="skip-end"]');
                if(skip_end){
                    skip_end.style.display='none';
                }

                const move_end = div.querySelector('li[data-control="move-end"]');
                if(move_end){
                    move_end.style.paddingTop='15px';
                }
                const hide_review = div.querySelector('li[data-control="hide-review"]');
                if(hide_review){
                    hide_review.style.paddingTop='15px';
                }


            }



            document.addEventListener("DOMContentLoaded", () => {
                // `document.body` の変化を監視（子要素の追加・削除を検知）
                const footerObserver = new MutationObserver(() => {
                    const div = document.querySelector('div[data-navigation-id="bottom-toolbar"]');

                    if (div) {
                        console.log('ターゲットが見つかりました', div);
                        // dataset を利用して初回のみ処理する
                        if (!div.dataset.init) {
                            div.dataset.init = "true"; // 初回処理済みマーク
                            handleFooterChanges(div);
                        }

                        footerObserver.disconnect();
                        // `target` に対する新しい MutationObserver を作成
                        const fObserver = new MutationObserver(records => {
                            fObserver.disconnect(); // 一時的に監視を停止（無限ループ回避）
                            handleFooterChanges(div);
                            fObserver.observe(div, { attributes: true, childList: true, subtree: true });
                        });
                        // `target` を監視
                        fObserver.observe(div, { attributes: true, childList: true, subtree: true });
                    }
                });

                // 監視の開始
                footerObserver.observe(document.body, { childList: true, subtree: true });
            });


            const handleHeaderChanges = (div) =>{
                div.href = "/taoDelivery/DeliveryServer/index";
                div.target = "";
            }

            document.addEventListener("DOMContentLoaded", () => {
                // `document.body` の変化を監視（子要素の追加・削除を検知）
                const headerObserver = new MutationObserver(() => {
                    const div = document.querySelector('a.lft.key-navigation-highlight');

                    if (div) {
                        
                        // dataset を利用して初回のみ処理する
                        if (!div.dataset.init) {
                            div.dataset.init = "true"; // 初回処理済みマーク
                            handleHeaderChanges(div);
                        }
                        
                        headerObserver.disconnect();
                        // `target` に対する新しい MutationObserver を作成
                        const hObserver = new MutationObserver(records => {
                            hObserver.disconnect(); // 一時的に監視を停止（無限ループ回避）
                            handleHeaderChanges(div);
                            hObserver.observe(div, { attributes: true, childList: true, subtree: true });
                        });
                        // `target` を監視
                        hObserver.observe(div, { attributes: true, childList: true, subtree: true });
                    }
                });

                // 監視の開始
                headerObserver.observe(document.body, { childList: true, subtree: true });
            });



            const handleBottom = (div) =>{
                div.innerHTML='GAKUTO';
                div.href="";
                div.style.textDecoration="none";
                div.addEventListener('click',(e)=>{e.preventDefault()});
                div.style.cursor = 'auto';
            }

            document.addEventListener("DOMContentLoaded", () => {
                // `document.body` の変化を監視（子要素の追加・削除を検知）
                const bottomObserver = new MutationObserver(() => {
                    const div = document.querySelector('footer .rgt a');

                    if (div) {
                        // dataset を利用して初回のみ処理する
                        if (!div.dataset.init) {
                            div.dataset.init = "true"; // 初回処理済みマーク
                            handleBottom(div);
                        }
                        
                        bottomObserver.disconnect();
                        // `target` に対する新しい MutationObserver を作成
                        const bObserver = new MutationObserver(records => {
                            bObserver.disconnect(); // 一時的に監視を停止（無限ループ回避）
                            handleBottom(div);
                            bObserver.observe(div, { attributes: true, childList: true, subtree: true });
                        });
                        // `target` を監視
                        bObserver.observe(div, { attributes: true, childList: true, subtree: true });
                    }
                });

                // 監視の開始
                bottomObserver.observe(document.body, { childList: true, subtree: true });
            });



        </script>
