(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{3758:function(e,t,r){Promise.resolve().then(r.bind(r,7476)),Promise.resolve().then(r.bind(r,3372))},357:function(e,t,r){"use strict";var s,n;e.exports=(null==(s=r.g.process)?void 0:s.env)&&"object"==typeof(null==(n=r.g.process)?void 0:n.env)?r.g.process:r(8081)},8081:function(e){!function(){var t={229:function(e){var t,r,s,n=e.exports={};function l(){throw Error("setTimeout has not been defined")}function i(){throw Error("clearTimeout has not been defined")}function a(e){if(t===setTimeout)return setTimeout(e,0);if((t===l||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(r){try{return t.call(null,e,0)}catch(r){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:l}catch(e){t=l}try{r="function"==typeof clearTimeout?clearTimeout:i}catch(e){r=i}}();var o=[],c=!1,u=-1;function m(){c&&s&&(c=!1,s.length?o=s.concat(o):u=-1,o.length&&d())}function d(){if(!c){var e=a(m);c=!0;for(var t=o.length;t;){for(s=o,o=[];++u<t;)s&&s[u].run();u=-1,t=o.length}s=null,c=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===i||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function f(e,t){this.fun=e,this.array=t}function h(){}n.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];o.push(new f(e,t)),1!==o.length||c||a(d)},f.prototype.run=function(){this.fun.apply(null,this.array)},n.title="browser",n.browser=!0,n.env={},n.argv=[],n.version="",n.versions={},n.on=h,n.addListener=h,n.once=h,n.off=h,n.removeListener=h,n.removeAllListeners=h,n.emit=h,n.prependListener=h,n.prependOnceListener=h,n.listeners=function(e){return[]},n.binding=function(e){throw Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(e){throw Error("process.chdir is not supported")},n.umask=function(){return 0}}},r={};function s(e){var n=r[e];if(void 0!==n)return n.exports;var l=r[e]={exports:{}},i=!0;try{t[e](l,l.exports,s),i=!1}finally{i&&delete r[e]}return l.exports}s.ab="//";var n=s(229);e.exports=n}()},8423:function(e,t,r){"use strict";let s=r(8472).Z.create({baseURL:"https://api-ligtas.parallaxed.ph",timeout:5e3,headers:{"Content-Type":"application/json"}});t.Z=s},7476:function(e,t,r){"use strict";var s=r(7437);r(2265);var n=r(357);t.default=function(){let e=n.env.NEXT_PUBLIC_BASE_PATH||"";return(0,s.jsx)("div",{className:"h-screen w-screen overflow-hidden",children:(0,s.jsx)("img",{src:"".concat(e,"/regcover.png"),className:"object-cover w-full h-full"})})}},3372:function(e,t,r){"use strict";var s=r(7437),n=r(2265),l=r(8423),i=r(357);t.default=n.memo(()=>{let e=i.env.NEXT_PUBLIC_BASE_PATH||"",[t,r]=(0,n.useState)(""),[a,o]=(0,n.useState)(""),[c,u]=(0,n.useState)(""),[m,d]=(0,n.useState)(""),[f,h]=(0,n.useState)(""),x=(0,n.useCallback)(async e=>{e.preventDefault();try{let e=f;if(!e){let r=t.split(" ").map(e=>e[0]).join("").toUpperCase();e="https://api.dicebear.com/9.x/initials/svg?seed=".concat(r)}let r=await l.Z.post("/auth/register",{name:t,email:a,user_password:c,profile_image:e});if(200===r.status){let t=r.data.userToken;localStorage.setItem("userToken",t),localStorage.setItem("profileImage",e),window.location.href="/pages/home/"}}catch(e){console.error("Registration failed:",e),d("Registration failed. Please try again later.")}},[t,a,c,f]);return(0,s.jsxs)("div",{className:"w-full p-4 grid grid-cols-1 sm:grid-cols-2 gap-2",children:[(0,s.jsxs)("div",{className:"h-full flex flex-col items-center justify-center p-4",children:[(0,s.jsx)("img",{src:"".concat(e,"/logon1.png"),className:"w-16 h-15 sm:w-64 sm:h-63 mt-4 sm:my-4",alt:"Logo"}),(0,s.jsx)("h1",{className:"w-full text-xl sm:text-4xl font-bold text-white sm:mb-2 text-center",children:"Batangas State University"}),(0,s.jsx)("p",{className:"text-lg sm:text-xl font-semibold text-white text-center sm:text-left",children:"Safe Spartan"})]}),(0,s.jsxs)("div",{className:"h-full flex flex-col justify-start p-4",children:[(0,s.jsx)("h1",{className:"text-md sm:text-2xl font-semibold text-white mb-3 sm:mb-5 text-center sm:text-left",children:"Create an account"}),(0,s.jsxs)("form",{onSubmit:x,className:"w-full",children:[(0,s.jsxs)("div",{className:"w-full grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3",children:[(0,s.jsx)("div",{className:"rounded-lg h-full sm:pr-2",children:(0,s.jsxs)("div",{className:"mb-1",children:[(0,s.jsx)("label",{htmlFor:"name",className:"block mb-1 text-sm text-white hidden sm:block",children:"Name"}),(0,s.jsx)("input",{type:"text",id:"name",value:t,onChange:e=>r(e.target.value),className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-3",placeholder:"Enter Name",required:!0})]})}),(0,s.jsx)("div",{className:"rounded-lg h-full sm:pr-2",children:(0,s.jsxs)("div",{className:"mb-1",children:[(0,s.jsx)("label",{htmlFor:"email",className:"block mb-1 text-sm text-white hidden sm:block",children:"Email"}),(0,s.jsx)("input",{type:"email",id:"email",value:a,onChange:e=>o(e.target.value),className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 sm:p-3",placeholder:"Enter Email",required:!0})]})})]}),(0,s.jsxs)("div",{className:"mb-8 sm:pr-2",children:[(0,s.jsx)("label",{htmlFor:"password",className:"block mb-1 text-sm font-medium text-white hidden sm:block",children:"Password"}),(0,s.jsx)("input",{type:"password",id:"password",value:c,onChange:e=>u(e.target.value),className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 sm:p-3",placeholder:"Enter Password",required:!0})]}),m&&(0,s.jsx)("p",{className:"text-red-500 text-sm mb-3 text-center",children:m}),(0,s.jsx)("div",{className:"flex justify-center items-center",children:(0,s.jsx)("button",{type:"submit",className:"text-black bg-white text-md sm:text-lg focus:ring-1 focus:outline-none focus:ring-[#FFD910]/50 font-medium rounded-md text-sm py-2 text-center w-full w-44 sm:w-64 inline-flex justify-center items-center mb-2 transition duration-300 ease-in-out hover:bg-red-800 hover:text-white",children:"Create Account"})})]}),(0,s.jsx)("div",{className:"my-6 text-center",children:(0,s.jsxs)("div",{className:"flex items-center justify-center",children:[(0,s.jsx)("hr",{className:"border-t-2 border-yellow-400 w-full"}),(0,s.jsx)("span",{className:"mx-2 text-white uppercase tracking-wide",children:"Or"}),(0,s.jsx)("hr",{className:"border-t-2 border-yellow-400 w-full"})]})}),(0,s.jsx)("div",{className:"flex justify-center items-center mb-5",children:(0,s.jsxs)("button",{type:"button",className:"text-black bg-white text-md sm:text-lg focus:ring-1 focus:outline-none focus:ring-[#FFD910]/50 font-medium rounded-md text-sm px-4 py-2 text-center w-44 sm:w-64 inline-flex justify-center items-center mb-2 transition duration-300 ease-in-out hover:bg-red-800 hover:text-white",onClick:()=>window.location.href="https://api-ligtas.parallaxed.ph/auth/google",children:[(0,s.jsx)("img",{src:"".concat(e,"/googleicon.png"),className:"w-3 h-3 sm:w-4 sm:h-4 mr-2",alt:"Google icon"}),"Google"]})}),(0,s.jsxs)("p",{className:"text-white mb-1 text-center text-xs sm:text-lg sm:text-left",children:["Already have an account?"," ",(0,s.jsx)("a",{href:"/pages/login",className:"text-[#FFD910] underline underline-offset-1",children:"Sign in"})]})]})]})})}},function(e){e.O(0,[472,971,23,744],function(){return e(e.s=3758)}),_N_E=e.O()}]);