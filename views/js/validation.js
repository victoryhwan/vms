
/** form validation check 
 * ex)
 * data-name="name" 
 * data-options='{"spaceChk" : "true", "numberChk" : "true", "rateChk" : "true"}'
 * 
 */
function formValidationChk(form) {

	for (let [key, value] of form.entries()) {
		var tagName = $('[name="'+key+'"]').prop('tagName');
		var target = $('' +tagName +'[name="'+key+'"]');
        
		// console.log(target.data("name") + " : " + value + " key : " + key);
		if(target.prop('required') && value == ''){
            if(target.data("name")){
                alert("["+target.data("name") + "]을/를 입력하세요.");
            }else{
                alert("값을 입력하세요.");
            }
			target.focus();
			return false;
		}
		if(target.data("options")){
		  if(target.data("options").spaceChk == "true"){
			if(value != '' && value.search(/\s/) != -1) { 
                if(target.data("name")){
					alert("["+target.data("name") + "] 입력정보를 확인하세요. \n(공백문자 저장불가)");
				}else{
					alert("입력정보를 확인하세요. \n(공백문자 저장불가)");
				}
				target.focus();
				return false; 
			}
		  }
		  if(target.data("options").numberChk == "true"){
			if(value != '' && !/^[0-9\-]+$/.test(value)){
				if(target.data("name")){
					alert("["+target.data("name") + "]입력정보를 확인하세요. \n(숫자,하이픈(-) 이외 문자 저장불가)");
				}else{
					alert("입력정보를 확인하세요. \n(숫자,하이픈(-) 이외 문자 저장불가)");
				}
				target.focus();
				return false;
			}
		  }
		  if(target.data("options").phoneNumChk == "true"){
			if(value != '' && !/^[0-9\-\(\)\s]+$/.test(value)){
				if(target.data("name")){
					alert("["+target.data("name") + "] 입력정보를 확인하세요. \n(숫자,-,(,),공백문자 이외 문자 저장불가)");
				}else{
					alert("입력정보를 확인하세요. \n(숫자,-,(,),공백문자 이외 문자 저장불가)");
				}
				target.focus();
				return false;
			}
		  }
		  if(target.data("options").rateChk == "true"){
			if(value < 0 || 100 < value){
				if(target.data("name")){
					alert("["+target.data("name") + "]을/를 정확히 입력하세요.");
				}else{
					alert("값을 정확히 입력하세요.");
				}
				target.focus();
				return false;
			}
		  }
		  if(target.data("options").korTextChk == "true"){//한글입력 방지 체크
			if(value != '' && /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(value)){
				if(target.data("name")){
					alert("["+target.data("name") + "] 입력정보를 확인하세요. \n(한글 입력 불가)");
				}else{
					alert("입력정보를 확인하세요. \n(한글 입력 불가)");
				}
				target.focus();
				return false;
			}
		  }
		}
	}
	return true;
}