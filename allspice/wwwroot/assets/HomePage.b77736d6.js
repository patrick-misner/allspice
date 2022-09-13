import{h as F,H,w as C,c as l,M as S,a as p,o as s,b as a,d as t,q as _,t as I,i as n,F as f,p as A,I as g,e as v,j as b,u as P,x as j}from"./vendor.2e10bab8.js";import{_ as M,r as x,l as u,P as h,a as B,A as i,b as w}from"./index.4698fcb8.js";const N={name:"Home",setup(){const d=F("Home");H(async()=>{try{await x.getRecipes()}catch(r){u.error(r),h.toast(r.message,"error")}}),C(async()=>{try{i.account.id&&await w.getFavorites()}catch(r){u.error(r),h.toast(r.message,"error")}});function o(r){if(r=="Home")return e=>!0;if(r=="Favorites")return e=>e.isFavorite==!0;if(r=="myRecipes")return e=>e.creatorId==i.account.id}return{recipeView:d,filterRecipe:o,recipes:l(()=>i.recipes.filter(o(d.value))),activeProvider:l(()=>i.activeRecipe),account:l(()=>i.account),favorites:l(()=>i.favorites),search:l(()=>i.search),searchWord:l(()=>i.searchWord),createRecipe(){S.getOrCreateInstance(document.getElementById("recipe-form")).show()},async login(){B.loginWithPopup()},async returnHome(){if(d.value="Home",i.search)try{i.search=!1,await x.getRecipes(),i.account.id&&await w.getFavorites()}catch(r){u.error(r),h.toast(r.message,"error")}}}}},m=d=>(P("data-v-08af4989"),d=d(),j(),d),W={class:"row justify-content-center"},E={class:"col-lg-6 overflow"},Y={class:"d-flex rounded text-primary justify-content-around bg-light elevation-3 p-3 m-3 align-items-center"},z={class:"row"},q={key:0,class:"text-center text-muted"},D={key:1,class:"text-center text-danger mt-3"},L=m(()=>t("span",null," No results ",-1)),O=[L],G={key:2,class:"col-12"},J={class:"d-flex justify-content-center"},K={key:0,class:"text-muted"},Q={key:1,class:"text-danger mt-3"},T={key:2},U=m(()=>t("span",{class:"text-muted"}," You have not added any recipes.",-1)),X=m(()=>t("a",{href:""},null,-1)),Z={class:"text-center m-3"},$={key:3,class:"text-danger mt-3"},ee={key:4,class:""},te=m(()=>t("span",{class:"text-muted"},"You must be signed in to view your recipes or favorites. ",-1)),oe={class:"text-center mt-3"},re={class:"position-fixed bottom-0 end-0 text-primary add-icon grow"};function se(d,o,r,e,ce,ie){const R=p("Recipe"),k=p("ActiveRecipe"),y=p("Modal"),V=p("RecipeForm");return s(),a(f,null,[t("div",W,[t("div",E,[t("div",Y,[t("span",{class:_([e.recipeView=="Home"&&!e.search?"selectable bg-primary rounded p-2 elevation-2":"selectable p-2"]),onClick:o[0]||(o[0]=c=>e.returnHome())},"Home",2),t("span",{class:_([e.recipeView=="myRecipes"?"selectable bg-primary rounded p-2 elevation-2":"selectable p-2"]),onClick:o[1]||(o[1]=c=>e.recipeView="myRecipes"),href:""}," My Recipes",2),t("span",{class:_([e.recipeView=="Favorites"?"selectable bg-primary rounded p-2 elevation-2":"selectable p-2"]),onClick:o[2]||(o[2]=c=>e.recipeView="Favorites")},"Favorites",2)])])]),t("div",z,[e.search==!0?(s(),a("div",q,[t("span",null,'Search results for "'+I(e.searchWord)+'" ',1)])):n("",!0),e.search==!0&&e.recipeView=="Home"&&e.recipes.length<1?(s(),a("div",D,O)):n("",!0),(s(!0),a(f,null,A(e.recipes,c=>(s(),g(R,{key:c.id,recipe:c},null,8,["recipe"]))),128)),e.recipes.length<1?(s(),a("div",G,[t("div",J,[e.recipeView=="Favorites"&&e.account.id&&!e.search?(s(),a("span",K,"You have not added any recipes to your favorites ")):n("",!0),e.recipeView=="Favorites"&&e.account.id&&e.search?(s(),a("span",Q,"no matches under favorites ")):n("",!0),e.recipeView=="myRecipes"&&e.account.id&&!e.search?(s(),a("div",T,[U,X,t("div",Z,[t("button",{onClick:o[3]||(o[3]=(...c)=>e.createRecipe&&e.createRecipe(...c)),class:"btn btn-primary",title:"Add a Recipe"}," Add Recipe ")])])):n("",!0),e.recipeView=="myRecipes"&&e.account.id&&e.search?(s(),a("span",$,"no matches under my recipes ")):n("",!0),e.account.id?n("",!0):(s(),a("div",ee,[te,t("div",oe,[t("button",{onClick:o[4]||(o[4]=(...c)=>e.login&&e.login(...c)),class:"btn btn-primary"},"Sign In")])]))])])):n("",!0)]),t("div",re,[t("i",{onClick:o[5]||(o[5]=(...c)=>e.createRecipe&&e.createRecipe(...c)),class:"mdi mdi-plus-circle selectable",style:{"font-size":"60px"}})]),v(y,{id:"active-recipe"},{body:b(()=>[e.activeProvider.id?(s(),g(k,{key:0})):n("",!0)]),_:1}),v(y,{id:"recipe-form"},{body:b(()=>[v(V)]),_:1})],64)}var de=M(N,[["render",se],["__scopeId","data-v-08af4989"]]);export{de as default};
