(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[343],{3685:function(e,t,s){Promise.resolve().then(s.bind(s,9997))},8423:function(e,t,s){"use strict";let a=s(8472).Z.create({baseURL:"http://atlas.batstate-u.edu.ph:5123",timeout:5e3,headers:{"Content-Type":"application/json"}});t.Z=a},9997:function(e,t,s){"use strict";var a=s(7437),r=s(2265),l=s(8423),n=s(9714);t.default=function(){let[e,t]=(0,r.useState)(""),[s,i]=(0,r.useState)(""),[o,c]=(0,r.useState)(""),m=async t=>{t.preventDefault();try{let t=await l.Z.post("/auth/login",{email:e,user_password:s});if(200===t.status&&t.data.userToken){let e=t.data.userToken;localStorage.setItem("userToken",e);let s=(0,n.o)(e);localStorage.setItem("profileImage",s.profile_image),window.location.href="http://atlas.batstate-u.edu.ph/commandcenter/ligtas/app/pages/home"}else c("Login failed. Please try again later.")}catch(e){console.error("Login failed:",e),e.response&&401===e.response.status?c("Invalid email or password"):c("Login failed. Please try again later.")}};return(0,a.jsxs)("div",{className:"w-full p-4 grid grid-cols-1 sm:grid-cols-2 gap-2",children:[(0,a.jsxs)("div",{className:"h-full flex flex-col items-center justify-center p-4",children:[(0,a.jsx)("img",{src:"/logon1.png",className:"w-16 h-15 sm:w-64 sm:h-63 mt-4 sm:my-4",alt:"Logo"}),(0,a.jsx)("h1",{className:"w-full text-xl sm:text-4xl font-bold text-white sm:mb-2 text-center",children:"Batangas State University"}),(0,a.jsx)("p",{className:"text-lg sm:text-xl font-semibold text-white text-center sm:text-left",children:"LIGTAS"})]}),(0,a.jsxs)("div",{className:"h-full flex flex-col justify-start p-4",children:[(0,a.jsx)("h1",{className:"text-md sm:text-2xl font-semibold text-white mb-3 sm:mb-5 text-center sm:text-left",children:"Login Account"}),(0,a.jsxs)("form",{onSubmit:m,className:"w-full",children:[(0,a.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3",children:[(0,a.jsxs)("div",{className:"rounded-lg",children:[(0,a.jsx)("label",{htmlFor:"email",className:"block text-sm text-white mb-1 sm:mb-0",children:"Email"}),(0,a.jsx)("input",{type:"email",id:"email",value:e,onChange:e=>t(e.target.value),className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 sm:p-3",placeholder:"Enter Email",required:!0})]}),(0,a.jsxs)("div",{className:"rounded-lg",children:[(0,a.jsx)("label",{htmlFor:"password",className:"block text-sm text-white mb-1 sm:mb-0",children:"Password"}),(0,a.jsx)("input",{type:"password",id:"password",value:s,onChange:e=>i(e.target.value),className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 sm:p-3",placeholder:"Enter Password",required:!0})]})]}),o&&(0,a.jsx)("p",{className:"text-red-500 text-sm mb-3",children:o}),(0,a.jsx)("div",{className:"flex justify-center items-center p-4",children:(0,a.jsx)("button",{type:"submit",className:"text-black bg-white text-md sm:text-lg focus:ring-1 focus:outline-none focus:ring-[#FFD910]/50 font-medium rounded-md text-sm py-2 text-center w-full sm:w-64 inline-flex justify-center items-center mb-2 transition duration-300 ease-in-out hover:bg-red-800 hover:text-white",children:"Login"})})]}),(0,a.jsx)("div",{className:"my-6 text-center",children:(0,a.jsxs)("div",{className:"flex items-center justify-center",children:[(0,a.jsx)("hr",{className:"border-t-2 border-yellow-400 w-full"}),(0,a.jsx)("span",{className:"mx-2 text-white uppercase tracking-wide",children:"Or"}),(0,a.jsx)("hr",{className:"border-t-2 border-yellow-400 w-full"})]})}),(0,a.jsx)("div",{className:"flex justify-center items-center mb-5",children:(0,a.jsxs)("button",{type:"button",className:"text-black bg-white text-md sm:text-lg focus:ring-1 focus:outline-none focus:ring-[#FFD910]/50 font-medium rounded-md text-sm px-4 py-2 text-center sm:w-64 inline-flex justify-center items-center mb-2 transition duration-300 ease-in-out hover:bg-red-800 hover:text-white",onClick:()=>window.location.href="http://atlas.batstate-u.edu.ph:5123/auth/google",children:[(0,a.jsx)("img",{src:"/googleicon.png",className:"w-3 h-3 sm:w-4 sm:h-4 mr-2",alt:"Google icon"}),"Google"]})}),(0,a.jsxs)("p",{className:"text-white mb-1 text-center text-xs sm:text-lg sm:text-left",children:["Don't have an account?"," ",(0,a.jsx)("a",{href:"/",className:"text-[#FFD910] underline underline-offset-1",children:"Sign Up"})]})]})]})}},9714:function(e,t,s){"use strict";s.d(t,{o:function(){return r}});class a extends Error{}function r(e,t){let s;if("string"!=typeof e)throw new a("Invalid token specified: must be a string");t||(t={});let r=!0===t.header?0:1,l=e.split(".")[r];if("string"!=typeof l)throw new a(`Invalid token specified: missing part #${r+1}`);try{s=function(e){let t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw Error("base64 string is not of the correct length")}try{var s;return s=t,decodeURIComponent(atob(s).replace(/(.)/g,(e,t)=>{let s=t.charCodeAt(0).toString(16).toUpperCase();return s.length<2&&(s="0"+s),"%"+s}))}catch(e){return atob(t)}}(l)}catch(e){throw new a(`Invalid token specified: invalid base64 for part #${r+1} (${e.message})`)}try{return JSON.parse(s)}catch(e){throw new a(`Invalid token specified: invalid json for part #${r+1} (${e.message})`)}}a.prototype.name="InvalidTokenError"}},function(e){e.O(0,[472,971,23,744],function(){return e(e.s=3685)}),_N_E=e.O()}]);