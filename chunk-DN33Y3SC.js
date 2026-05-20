import{c as te,d as E,f as S,h as O}from"./chunk-DUKSTT3K.js";import{Q as oe,R as se,S as ie,U as ae,V as ce,Y as y,aa as re,ba as le,i as W,k as X,m as ee,n as ne}from"./chunk-5FRIAKEX.js";import{$ as A,$a as M,Aa as c,Db as p,Eb as Y,Fa as R,Fb as Z,Lb as J,Nb as z,Ob as K,Pb as U,Qa as w,R as D,Ta as I,U as F,Ua as j,Va as d,W as v,aa as L,ab as r,ac as B,ba as T,bb as l,fb as o,gb as u,hb as f,ia as N,ib as b,lb as P,ma as _,ob as k,pb as V,rb as H,sb as a,tb as q,ub as G,vb as h,xa as Q,xb as x,yb as C,zb as $}from"./chunk-IO26NHSQ.js";var fe=["data-p-icon","times"],me=(()=>{class n extends re{static \u0275fac=(()=>{let e;return function(i){return(e||(e=_(n)))(i||n)}})();static \u0275cmp=w({type:n,selectors:[["","data-p-icon","times"]],features:[I],attrs:fe,decls:1,vars:0,consts:[["d","M8.01186 7.00933L12.27 2.75116C12.341 2.68501 12.398 2.60524 12.4375 2.51661C12.4769 2.42798 12.4982 2.3323 12.4999 2.23529C12.5016 2.13827 12.4838 2.0419 12.4474 1.95194C12.4111 1.86197 12.357 1.78024 12.2884 1.71163C12.2198 1.64302 12.138 1.58893 12.0481 1.55259C11.9581 1.51625 11.8617 1.4984 11.7647 1.50011C11.6677 1.50182 11.572 1.52306 11.4834 1.56255C11.3948 1.60204 11.315 1.65898 11.2488 1.72997L6.99067 5.98814L2.7325 1.72997C2.59553 1.60234 2.41437 1.53286 2.22718 1.53616C2.03999 1.53946 1.8614 1.61529 1.72901 1.74767C1.59663 1.88006 1.5208 2.05865 1.5175 2.24584C1.5142 2.43303 1.58368 2.61419 1.71131 2.75116L5.96948 7.00933L1.71131 11.2675C1.576 11.403 1.5 11.5866 1.5 11.7781C1.5 11.9696 1.576 12.1532 1.71131 12.2887C1.84679 12.424 2.03043 12.5 2.2219 12.5C2.41338 12.5 2.59702 12.424 2.7325 12.2887L6.99067 8.03052L11.2488 12.2887C11.3843 12.424 11.568 12.5 11.7594 12.5C11.9509 12.5 12.1346 12.424 12.27 12.2887C12.4053 12.1532 12.4813 11.9696 12.4813 11.7781C12.4813 11.5866 12.4053 11.403 12.27 11.2675L8.01186 7.00933Z","fill","currentColor"]],template:function(s,i){s&1&&(T(),P(0,"path",0))},encapsulation:2})}return n})();var de=`
    .p-message {
        border-radius: dt('message.border.radius');
        outline-width: dt('message.border.width');
        outline-style: solid;
    }

    .p-message-content {
        display: flex;
        align-items: center;
        padding: dt('message.content.padding');
        gap: dt('message.content.gap');
        height: 100%;
    }

    .p-message-icon {
        flex-shrink: 0;
    }

    .p-message-close-button {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-inline-start: auto;
        overflow: hidden;
        position: relative;
        width: dt('message.close.button.width');
        height: dt('message.close.button.height');
        border-radius: dt('message.close.button.border.radius');
        background: transparent;
        transition:
            background dt('message.transition.duration'),
            color dt('message.transition.duration'),
            outline-color dt('message.transition.duration'),
            box-shadow dt('message.transition.duration'),
            opacity 0.3s;
        outline-color: transparent;
        color: inherit;
        padding: 0;
        border: none;
        cursor: pointer;
        user-select: none;
    }

    .p-message-close-icon {
        font-size: dt('message.close.icon.size');
        width: dt('message.close.icon.size');
        height: dt('message.close.icon.size');
    }

    .p-message-close-button:focus-visible {
        outline-width: dt('message.close.button.focus.ring.width');
        outline-style: dt('message.close.button.focus.ring.style');
        outline-offset: dt('message.close.button.focus.ring.offset');
    }

    .p-message-info {
        background: dt('message.info.background');
        outline-color: dt('message.info.border.color');
        color: dt('message.info.color');
        box-shadow: dt('message.info.shadow');
    }

    .p-message-info .p-message-close-button:focus-visible {
        outline-color: dt('message.info.close.button.focus.ring.color');
        box-shadow: dt('message.info.close.button.focus.ring.shadow');
    }

    .p-message-info .p-message-close-button:hover {
        background: dt('message.info.close.button.hover.background');
    }

    .p-message-info.p-message-outlined {
        color: dt('message.info.outlined.color');
        outline-color: dt('message.info.outlined.border.color');
    }

    .p-message-info.p-message-simple {
        color: dt('message.info.simple.color');
    }

    .p-message-success {
        background: dt('message.success.background');
        outline-color: dt('message.success.border.color');
        color: dt('message.success.color');
        box-shadow: dt('message.success.shadow');
    }

    .p-message-success .p-message-close-button:focus-visible {
        outline-color: dt('message.success.close.button.focus.ring.color');
        box-shadow: dt('message.success.close.button.focus.ring.shadow');
    }

    .p-message-success .p-message-close-button:hover {
        background: dt('message.success.close.button.hover.background');
    }

    .p-message-success.p-message-outlined {
        color: dt('message.success.outlined.color');
        outline-color: dt('message.success.outlined.border.color');
    }

    .p-message-success.p-message-simple {
        color: dt('message.success.simple.color');
    }

    .p-message-warn {
        background: dt('message.warn.background');
        outline-color: dt('message.warn.border.color');
        color: dt('message.warn.color');
        box-shadow: dt('message.warn.shadow');
    }

    .p-message-warn .p-message-close-button:focus-visible {
        outline-color: dt('message.warn.close.button.focus.ring.color');
        box-shadow: dt('message.warn.close.button.focus.ring.shadow');
    }

    .p-message-warn .p-message-close-button:hover {
        background: dt('message.warn.close.button.hover.background');
    }

    .p-message-warn.p-message-outlined {
        color: dt('message.warn.outlined.color');
        outline-color: dt('message.warn.outlined.border.color');
    }

    .p-message-warn.p-message-simple {
        color: dt('message.warn.simple.color');
    }

    .p-message-error {
        background: dt('message.error.background');
        outline-color: dt('message.error.border.color');
        color: dt('message.error.color');
        box-shadow: dt('message.error.shadow');
    }

    .p-message-error .p-message-close-button:focus-visible {
        outline-color: dt('message.error.close.button.focus.ring.color');
        box-shadow: dt('message.error.close.button.focus.ring.shadow');
    }

    .p-message-error .p-message-close-button:hover {
        background: dt('message.error.close.button.hover.background');
    }

    .p-message-error.p-message-outlined {
        color: dt('message.error.outlined.color');
        outline-color: dt('message.error.outlined.border.color');
    }

    .p-message-error.p-message-simple {
        color: dt('message.error.simple.color');
    }

    .p-message-secondary {
        background: dt('message.secondary.background');
        outline-color: dt('message.secondary.border.color');
        color: dt('message.secondary.color');
        box-shadow: dt('message.secondary.shadow');
    }

    .p-message-secondary .p-message-close-button:focus-visible {
        outline-color: dt('message.secondary.close.button.focus.ring.color');
        box-shadow: dt('message.secondary.close.button.focus.ring.shadow');
    }

    .p-message-secondary .p-message-close-button:hover {
        background: dt('message.secondary.close.button.hover.background');
    }

    .p-message-secondary.p-message-outlined {
        color: dt('message.secondary.outlined.color');
        outline-color: dt('message.secondary.outlined.border.color');
    }

    .p-message-secondary.p-message-simple {
        color: dt('message.secondary.simple.color');
    }

    .p-message-contrast {
        background: dt('message.contrast.background');
        outline-color: dt('message.contrast.border.color');
        color: dt('message.contrast.color');
        box-shadow: dt('message.contrast.shadow');
    }

    .p-message-contrast .p-message-close-button:focus-visible {
        outline-color: dt('message.contrast.close.button.focus.ring.color');
        box-shadow: dt('message.contrast.close.button.focus.ring.shadow');
    }

    .p-message-contrast .p-message-close-button:hover {
        background: dt('message.contrast.close.button.hover.background');
    }

    .p-message-contrast.p-message-outlined {
        color: dt('message.contrast.outlined.color');
        outline-color: dt('message.contrast.outlined.border.color');
    }

    .p-message-contrast.p-message-simple {
        color: dt('message.contrast.simple.color');
    }

    .p-message-text {
        font-size: dt('message.text.font.size');
        font-weight: dt('message.text.font.weight');
    }

    .p-message-icon {
        font-size: dt('message.icon.size');
        width: dt('message.icon.size');
        height: dt('message.icon.size');
    }

    .p-message-enter-from {
        opacity: 0;
    }

    .p-message-enter-active {
        transition: opacity 0.3s;
    }

    .p-message.p-message-leave-from {
        max-height: 1000px;
    }

    .p-message.p-message-leave-to {
        max-height: 0;
        opacity: 0;
        margin: 0;
    }

    .p-message-leave-active {
        overflow: hidden;
        transition:
            max-height 0.45s cubic-bezier(0, 1, 0, 1),
            opacity 0.3s,
            margin 0.3s;
    }

    .p-message-leave-active .p-message-close-button {
        opacity: 0;
    }

    .p-message-sm .p-message-content {
        padding: dt('message.content.sm.padding');
    }

    .p-message-sm .p-message-text {
        font-size: dt('message.text.sm.font.size');
    }

    .p-message-sm .p-message-icon {
        font-size: dt('message.icon.sm.size');
        width: dt('message.icon.sm.size');
        height: dt('message.icon.sm.size');
    }

    .p-message-sm .p-message-close-icon {
        font-size: dt('message.close.icon.sm.size');
        width: dt('message.close.icon.sm.size');
        height: dt('message.close.icon.sm.size');
    }

    .p-message-lg .p-message-content {
        padding: dt('message.content.lg.padding');
    }

    .p-message-lg .p-message-text {
        font-size: dt('message.text.lg.font.size');
    }

    .p-message-lg .p-message-icon {
        font-size: dt('message.icon.lg.size');
        width: dt('message.icon.lg.size');
        height: dt('message.icon.lg.size');
    }

    .p-message-lg .p-message-close-icon {
        font-size: dt('message.close.icon.lg.size');
        width: dt('message.close.icon.lg.size');
        height: dt('message.close.icon.lg.size');
    }

    .p-message-outlined {
        background: transparent;
        outline-width: dt('message.outlined.border.width');
    }

    .p-message-simple {
        background: transparent;
        outline-color: transparent;
        box-shadow: none;
    }

    .p-message-simple .p-message-content {
        padding: dt('message.simple.content.padding');
    }

    .p-message-outlined .p-message-close-button:hover,
    .p-message-simple .p-message-close-button:hover {
        background: transparent;
    }
`;var _e=["container"],be=["icon"],he=["closeicon"],xe=["*"],Ce=(n,t)=>({showTransitionParams:n,hideTransitionParams:t}),ye=n=>({value:"visible()",params:n}),ve=n=>({closeCallback:n});function Te(n,t){n&1&&k(0)}function we(n,t){if(n&1&&d(0,Te,1,0,"ng-container",4),n&2){let e=a(2);o("ngTemplateOutlet",e.iconTemplate||e._iconTemplate)}}function Ie(n,t){if(n&1&&b(0,"i",2),n&2){let e=a(2);p(e.cn(e.cx("icon"),e.icon)),o("pBind",e.ptm("icon"))}}function ke(n,t){n&1&&k(0)}function Me(n,t){if(n&1&&d(0,ke,1,0,"ng-container",5),n&2){let e=a(2);o("ngTemplateOutlet",e.containerTemplate||e._containerTemplate)("ngTemplateOutletContext",z(2,ve,e.closeCallback))}}function ze(n,t){if(n&1&&b(0,"span",9),n&2){let e=a(4);o("pBind",e.ptm("text"))("ngClass",e.cx("text"))("innerHTML",e.text,Q)}}function Be(n,t){if(n&1&&(u(0,"div"),d(1,ze,1,3,"span",8),f()),n&2){let e=a(3);c(),o("ngIf",!e.escape)}}function Ee(n,t){if(n&1&&(u(0,"span",7),Y(1),f()),n&2){let e=a(4);o("pBind",e.ptm("text"))("ngClass",e.cx("text")),c(),Z(e.text)}}function Se(n,t){if(n&1&&d(0,Ee,2,3,"span",10),n&2){let e=a(3);o("ngIf",e.escape&&e.text)}}function Oe(n,t){if(n&1&&(d(0,Be,2,1,"div",6)(1,Se,1,1,"ng-template",null,0,U),u(3,"span",7),G(4),f()),n&2){let e=$(2),s=a(2);o("ngIf",!s.escape)("ngIfElse",e),c(3),o("pBind",s.ptm("text"))("ngClass",s.cx("text"))}}function De(n,t){if(n&1&&b(0,"i",7),n&2){let e=a(3);p(e.cn(e.cx("closeIcon"),e.closeIcon)),o("pBind",e.ptm("closeIcon"))("ngClass",e.closeIcon)}}function Fe(n,t){n&1&&k(0)}function Ae(n,t){if(n&1&&d(0,Fe,1,0,"ng-container",4),n&2){let e=a(3);o("ngTemplateOutlet",e.closeIconTemplate||e._closeIconTemplate)}}function Le(n,t){if(n&1&&(T(),b(0,"svg",14)),n&2){let e=a(3);p(e.cx("closeIcon")),o("pBind",e.ptm("closeIcon"))}}function Ne(n,t){if(n&1){let e=V();u(0,"button",11),H("click",function(i){A(e);let g=a(2);return L(g.close(i))}),r(1,De,1,4,"i",12),r(2,Ae,1,1,"ng-container"),r(3,Le,1,3,":svg:svg",13),f()}if(n&2){let e=a(2);p(e.cx("closeButton")),o("pBind",e.ptm("closeButton")),M("aria-label",e.closeAriaLabel),c(),l(e.closeIcon?1:-1),c(),l(e.closeIconTemplate||e._closeIconTemplate?2:-1),c(),l(!e.closeIconTemplate&&!e._closeIconTemplate&&!e.closeIcon?3:-1)}}function Qe(n,t){if(n&1&&(u(0,"div",2)(1,"div",2),r(2,we,1,1,"ng-container"),r(3,Ie,1,3,"i",1),r(4,Me,1,4,"ng-container")(5,Oe,5,4),r(6,Ne,4,7,"button",3),f()()),n&2){let e=a();p(e.cn(e.cx("root"),e.styleClass)),o("pBind",e.ptm("root"))("@messageAnimation",z(16,ye,K(13,Ce,e.showTransitionOptions,e.hideTransitionOptions))),M("aria-live","polite")("role","alert"),c(),p(e.cx("content")),o("pBind",e.ptm("content")),c(),l(e.iconTemplate||e._iconTemplate?2:-1),c(),l(e.icon?3:-1),c(),l(e.containerTemplate||e._containerTemplate?4:5),c(2),l(e.closable?6:-1)}}var Re={root:({instance:n})=>["p-message p-component p-message-"+n.severity,"p-message-"+n.variant,{"p-message-sm":n.size==="small","p-message-lg":n.size==="large"}],content:"p-message-content",icon:"p-message-icon",text:"p-message-text",closeButton:"p-message-close-button",closeIcon:"p-message-close-icon"},pe=(()=>{class n extends ie{name="message";style=de;classes=Re;static \u0275fac=(()=>{let e;return function(i){return(e||(e=_(n)))(i||n)}})();static \u0275prov=D({token:n,factory:n.\u0275fac})}return n})();var ge=new F("MESSAGE_INSTANCE"),gn=(()=>{class n extends ce{_componentStyle=v(pe);bindDirectiveInstance=v(y,{self:!0});$pcMessage=v(ge,{optional:!0,skipSelf:!0})??void 0;onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("host"))}severity="info";text;escape=!0;style;styleClass;closable=!1;icon;closeIcon;life;showTransitionOptions="300ms ease-out";hideTransitionOptions="200ms cubic-bezier(0.86, 0, 0.07, 1)";size;variant;onClose=new R;get closeAriaLabel(){return this.config.translation.aria?this.config.translation.aria.close:void 0}visible=N(!0);containerTemplate;iconTemplate;closeIconTemplate;templates;_containerTemplate;_iconTemplate;_closeIconTemplate;closeCallback=e=>{this.close(e)};onInit(){this.life&&setTimeout(()=>{this.visible.set(!1)},this.life)}onAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"container":this._containerTemplate=e.template;break;case"icon":this._iconTemplate=e.template;break;case"closeicon":this._closeIconTemplate=e.template;break}})}close(e){this.visible.set(!1),this.onClose.emit({originalEvent:e})}static \u0275fac=(()=>{let e;return function(i){return(e||(e=_(n)))(i||n)}})();static \u0275cmp=w({type:n,selectors:[["p-message"]],contentQueries:function(s,i,g){if(s&1&&(h(g,_e,4),h(g,be,4),h(g,he,4),h(g,oe,4)),s&2){let m;x(m=C())&&(i.containerTemplate=m.first),x(m=C())&&(i.iconTemplate=m.first),x(m=C())&&(i.closeIconTemplate=m.first),x(m=C())&&(i.templates=m)}},inputs:{severity:"severity",text:"text",escape:[2,"escape","escape",B],style:"style",styleClass:"styleClass",closable:[2,"closable","closable",B],icon:"icon",closeIcon:"closeIcon",life:"life",showTransitionOptions:"showTransitionOptions",hideTransitionOptions:"hideTransitionOptions",size:"size",variant:"variant"},outputs:{onClose:"onClose"},features:[J([pe,{provide:ge,useExisting:n},{provide:ae,useExisting:n}]),j([y]),I],ngContentSelectors:xe,decls:1,vars:1,consts:[["escapeOut",""],[3,"pBind","class"],[3,"pBind"],["pRipple","","type","button",3,"pBind","class"],[4,"ngTemplateOutlet"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[4,"ngIf","ngIfElse"],[3,"pBind","ngClass"],[3,"pBind","ngClass","innerHTML",4,"ngIf"],[3,"pBind","ngClass","innerHTML"],[3,"pBind","ngClass",4,"ngIf"],["pRipple","","type","button",3,"click","pBind"],[3,"pBind","class","ngClass"],["data-p-icon","times",3,"pBind","class"],["data-p-icon","times",3,"pBind"]],template:function(s,i){s&1&&(q(),r(0,Qe,7,18,"div",1)),s&2&&l(i.visible()?0:-1)},dependencies:[ne,W,X,ee,me,le,se,y],encapsulation:2,data:{animation:[te("messageAnimation",[O(":enter",[S({opacity:0,transform:"translateY(-25%)"}),E("{{showTransitionParams}}")]),O(":leave",[E("{{hideTransitionParams}}",S({height:0,marginTop:0,marginBottom:0,marginLeft:0,marginRight:0,opacity:0}))])])]},changeDetection:0})}return n})();export{gn as a};
