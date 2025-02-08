import {Component} from './component.js'
import * as RedoUndo from './redo_undo.js'
import {edit} from './edit/edit.js'
import {copyElHtml,deleteElHtml,pasteElHtml} from './copyPasteDeleteHandler.js'
import {showMsgOnHeader} from './lib.js'
import * as PR from './presentation_handler.js'

const component = new Component()
const container = $('#topic-container')

function editEnable() {
    const container = $('#topic-container')
    return !! container.$('[contenteditable],textarea')
}
function x(){ return $('.selectedEl') }


const actions = {
    '1+ctrl': () => component.create('section'),
    '1+alt': () => joinMultipleEl(),
    '2+ctrl': () => component.create('heading'),
    '3+ctrl': () => component.create('title'),
    '4+ctrl': () => component.create('text'),
    '5+ctrl': () => component.create('details'),
    '6+ctrl': () => component.create('list'),
    '7+ctrl': () => { component.create('table'); openRightSideBar()},
    '8+ctrl': () => { component.create('code'); openRightSideBar()},
    '9+ctrl': () => { component.create('image'); openRightSideBar()}
};


export function shortcutHandler(){


Trigger('#modal-content','keydown',(e)=>{
    e.stopPropagation()
    if(!$('#modal-content-edit-btn').checked) return ;
    // console.log(`key = ${e.key} || code = ${e.code}`)

    const keys = [
        e.key.toLowerCase(),
        e.ctrlKey ? 'ctrl' : '',
        e.altKey ? 'alt' : '',
        e.shiftKey ? 'shift' : ''
    ].filter(Boolean).join('+'); // Remove empty values and join


    if (actions[keys]){
        e.preventDefault();
        actions[keys]();
    }

    

  //   if(e.key === 'e' && e.ctrlKey){
  //       e.preventDefault()        
  //       click('#modal-content-edit-btn')
  //   }

  //   let editMode = $('#modal-content-edit-btn').checked
  //   if(editMode){

  //      if(e.key === '1' && e.ctrlKey === true){
  //          e.preventDefault()
  //          component.create('section')
  //     }
  //      if(e.key === '1' && e.altKey === true){
  //          e.preventDefault()
  //          joinMultipleEl()
  //     }

  //     else if(e.key === '2' && e.ctrlKey === true){
  //          e.preventDefault()
  //          component.create('heading')
  //     }

  //     else if(e.key === '3' && e.ctrlKey === true){
  //          e.preventDefault()        
  //          component.create('title')
  //     }

  //     else if(e.key === '4' && e.ctrlKey === true){
  //          e.preventDefault()        
  //          component.create('text')
  //     }
  //     else if(e.key === '5' && e.ctrlKey === true){
  //          e.preventDefault()        
  //          component.create('details')
  //     }
  //     else if(e.key === '6' && e.ctrlKey === true){
  //          e.preventDefault()        
  //          component.create('list')
  //     }
  //     else if(e.key === '7' && e.ctrlKey === true){
  //          e.preventDefault()        
  //          component.create('table')
  //          openRightSideBar()
  //     }
  //     else if(e.key === '8' && e.ctrlKey === true){
  //          e.preventDefault()        
  //          component.create('code')
  //          openRightSideBar()
  //     }
  //     else if(e.key === '9' && e.ctrlKey === true){
  //          e.preventDefault()        
  //          component.create('image')
  //          openRightSideBar()
  //     }
  //     else if(e.key === 'Delete'){
  //          e.preventDefault()        
  //          deleteElHtml()
  //          showMsgOnHeader('deleted','trash',true)
  //          RedoUndo.updateRedoUndo()
  //      }

  //    else if(e.altKey && e.key === 'e'){
  //       e.preventDefault()
  //       const sl = $('.selectedEl')
  //       sl.attr('contenteditable') ? sl.rattr('contenteditable') : sl.attr('contenteditable','true')
  //       sl.focus()
  //    }  

  //     else if(e.key === 'v' && e.ctrlKey === true){
  //          if(editEnable) return ;                
  //          e.preventDefault()        
  //          pasteElHtml()
  //          showMsgOnHeader('pasted','circle-check',true)
  //          RedoUndo.updateRedoUndo()
  //      }

  //     else if(e.key === 'p' && e.ctrlKey === true){
  //          e.preventDefault()
  //          $('.selectedEl').htmlToPdf()
  //      }

  //     else if(e.key === 'x' && e.ctrlKey === true){
  //          if(editEnable) return ;        
  //          e.preventDefault()        
  //          copyElHtml()
  //          deleteElHtml()           
  //          showMsgOnHeader('cutted','cut',true)
  //          RedoUndo.updateRedoUndo()
  //      }
  //     else if(e.key === 'c' && e.ctrlKey === true){
  //          if(editEnable) return ;        
  //          e.preventDefault()        
  //           copyElHtml()
  //           showMsgOnHeader('copied','clone',true)
  //     } 
  //     else if(e.key === 'z' && e.ctrlKey === true){
  //          e.preventDefault()
  //          if(editEnable()) return ;
  //          RedoUndo.undo()
  //     } 
  //     else if(e.key === 'y' && e.ctrlKey === true){
  //          e.preventDefault()
  //          if(editEnable()) return ;
  //          RedoUndo.redo()
  //     }       
  //     else if(e.key === "Tab"){
  //           e.preventDefault()        
  //           if(PR.active){
  //             let target = $('.selectedEl')
  //             let siblings = [];
  //             while (target.nextElementSibling) {
  //               target = target.nextElementSibling;
  //               siblings.push(target);
  //            }              
  //             siblings.forEach(el=>{el.classList.add('o0')})
  //           }else{                
  //             edit('text')
  //           }
  //     }
  //     else if(e.altKey && e.key === 'r'){
  //           e.preventDefault()
  //           edit('content')
  //     }                              
  //     else if(e.altKey && e.key === 'n'){
  //           e.preventDefault()
  //           edit('command')
  //     }                        
  //     else if(e.altKey && e.key === 'c'){
  //           e.preventDefault()
  //           edit('class')
  //     }                              
  //     else if(e.altKey && e.key === 's'){
  //           e.preventDefault()
  //           edit('style')
  //     }                                    
  //     else if(e.altKey && e.key === 'w'){
  //           e.preventDefault()
  //           edit()
  //     }                  
  //     else if(e.altKey && e.key === 'f'){
  //           e.preventDefault()
  //          if(!$('.selectedEl')) return;
  //          let allHtml = ''
  //          $x('.selectedEl').forEach(el=>{
  //            allHtml += el.Html()
  //          })              
  //          new Prompt({type:'content',content:allHtml,width:12,title:'content',footer:'hide'}            
  //     }                        
  //     else if(e.ctrlKey && e.key === 'h'){
  //           e.preventDefault()
  //           if(editEnable()) return
  //           PR.active ? PR.annotateEl() : edit('html')
  //     }            
  //     else if(e.ctrlKey && e.code === "Space"){
  //             e.preventDefault()        
  //             if(PR.active){
  //                  PR.typer.start()
  //                  return ;
  //             }
  //             if(!$('.selectedEl')) return;
  //             let allHtml = ''
  //             $x('.selectedEl').forEach(el=>{
  //               allHtml += el.Html()
  //             })              
  //             new Prompt({type:'content',content:allHtml,width:12,title:'content',footer:'hide'})
  //     }      
  //     else if(e.altKey && e.key === 't'){
  //       e.preventDefault()
  //       if(!PR.active || editEnable()) return ;
  //       PR.init_typer()
  //     }      

  //     else if(e.code === 'Space'){
  //         e.preventDefault()        
  //         if(!PR.active || editEnable()) return ;          
  //         PR.typer.stop()
  //     }            
  //     else if(e.ctrlKey && e.altKey && e.code === 'ArrowDown'){
  //             e.preventDefault()
  //             if(PR.active){
  //               let sl = $('.selectedEl')
  //               let next = sl.nextElementSibling
  //               if(!next) return
  //               next.children[0].classList.remove('o0')
  //               next.children[0].click()
  //               sl.classList.remove('selectedEl')    
  //               next.children[0].classList.add('selectedEl')                
  //               PR.init_typer()
  //               return;
  //             }
  //             let selectedEl = $_('.selectedEl')
  //             selectedEl.parentNode.html(selectedEl.Html(),true)
  //             selectedEl.jumpTo()
  //             RedoUndo.updateRedoUndo()
  //     }
  //     else if(e.ctrlKey && e.altKey && e.code === 'ArrowUp'){
  //             e.preventDefault()
  //             let selectedEl = $_('.selectedEl')
  //             selectedEl.insertAdjacentHTML('beforebegin',selectedEl.Html())
  //             selectedEl.jumpTo()
  //             RedoUndo.updateRedoUndo()
  //     }      
  //     else if(e.altKey && e.code === 'ArrowDown'){
  //             e.preventDefault()
  //             if(PR.active){
  //                 let selectedEl = $_('.selectedEl')
  //                 let nextSibling = selectedEl.nextElementSibling                
  //                 if(!nextSibling) return
  //                 nextSibling.classList.remove('o0')                    
  //                 selectedEl.classList.remove('selectedEl')
  //                 nextSibling.classList.add('selectedEl')
  //                 nextSibling.click()
  //                 PR.init_typer()
  //                 return;
  //             }
  //             let selectedEl = $_('.selectedEl')
  //             let nextSibling = selectedEl.nextElementSibling
  //             if(!nextSibling) return ;
  //             nextSibling.after(selectedEl)
  //             selectedEl.jumpTo()
  //             RedoUndo.updateRedoUndo()
  //     }            
  //     else if(e.altKey && e.code === 'ArrowUp'){
  //             e.preventDefault()
  //             let selectedEl = $_('.selectedEl')
  //             let prevSibling = selectedEl.previousElementSibling
  //             if(!prevSibling) return ;
  //             prevSibling.before(selectedEl)
  //             selectedEl.jumpTo()
  //             RedoUndo.updateRedoUndo()
  //     }                  
  //     else if(e.ctrlKey && e.code === 'ArrowLeft'){
  //             if(editEnable()) return;        
  //             e.preventDefault()
  //             const widgetBar = $('#prompt-offcanvas')
  //             x = new bootstrap.Offcanvas(widgetBar)
  //             x.show()
  //     }      
  //     else if(e.ctrlKey && e.code === 'ArrowRight'){
  //             if(editEnable()) return;        
  //             e.preventDefault()
  //             const widgetBar = $('#prompt-offcanvas')
  //             x = new bootstrap.Offcanvas(widgetBar)
  //             x.hide()
  //     }
  //     else if(e.ctrlKey && e.key === 'ArrowDown'){
  //          e.preventDefault()
  //         if(PR.active){
  //             let selectedEl = $('.selectedEl')
  //             let nextEl = selectedEl.nextElementSibling
  //             if(!nextEl) return ;
  //             nextEl.classList.remove('o0')
  //             if(!nextEl.children){
  //               nextEl.click()
  //               return ;
  //             }
  //             Array.from(nextEl.children).forEach(el=>el.classList.add('o0'))
  //             nextEl.children[0].classList.remove('o0')              
  //             nextEl.children[0].click()                            
  //             PR.handleSideEl()
  //         }else{
  //          component.create('br')            
  //         }
  //     }            
  //     else if(e.ctrlKey && e.code === "Minus"){
  //          e.preventDefault()
  //          component.create('hr')
  //     }      
  //     else if(e.key === 'ArrowLeft'){
  //          if(!PR.active) return ;
  //          e.preventDefault()
  //          PR.prev()           
  //     }      
  //     else if(e.key === 'ArrowRight'){
  //          if(!PR.active) return ;        
  //          e.preventDefault()
  //          PR.next()           
  //     }      
  //     else if(e.altKey && e.key === 'ArrowRight'){
  //          if(!PR.active) return ;        
  //          e.preventDefault()
  //          PR.next(true)       
  //     }            
  //     else if(e.altKey && e.key === 'p'){
  //          e.preventDefault()
  //          PR.active ? PR.end() : PR.start()
  //     }
  //     else if (e.altKey && e.key === 'l'){
  //          e.preventDefault();
  //          const sl = $x('.selectedEl');
  //          if (sl.length !== 2) return;
  //          let sidebarEl, outsideEl;
  //          sl.forEach(el => {
  //             el.closest('#pr-sidebar') ? (sidebarEl = el) : (outsideEl = el);
  //          });
  //          if(!(outsideEl && sidebarEl)) return ;
  //          let prId = sidebarEl.id || (sidebarEl.id = `el-${Math.floor(Math.random() * 1000)}`);
  //          outsideEl.attr('data-pr-el',prId)
  //          showMsgOnHeader('linked','circle-check',true)
  //          outsideEl.classList.remove('selectedEl')           
  //          sidebarEl.classList.remove('selectedEl')                      
  //    }
  //   else if (e.ctrlKey && e.key === 'l') {
  //       e.preventDefault();
  //       const [src, target] = $x('.selectedEl');
  //       if (!src || !target || $('#modal-content .selectedEl').length > 2) return;
  //       target.id ||= `el-${Math.floor(Math.random() * 10000)}`;
  //       src.attr('data-to', `#${target.id}`);
  //       showMsgOnHeader('connected','circle-check',true)        
  //   }
  //     else if(e.key === 'Escape'){
  //       if(!PR.active) return ;
  //       e.preventDefault()
  //     }      
  //     else if(e.ctrlKey && e.key === 'Backspace'){
  //       const sl = $('.selectedEl')
  //       if(!sl || sl.parentNode === container) return ;
  //       sl.parentNode.click()
  //       sl.parentNode.jumpTo()        
  //       sl.parentNode.$x('.o0').forEach(el=>el.classList.remove('o0'))
  //     }            
  //     else if(e.ctrlKey && e.key === 'Enter'){
  //       if(editEnable()) return ;
  //       _$('.selectedEl *')?.click()
  //       _$('.selectedEl *')?.jumpTo()

  //     }                  
  //     else if(e.key === 'ArrowDown'){
  //       e.preventDefault()        
  //       const sl = $('.selectedEl')        
  //       if(editEnable() || !sl || sl === container) return ;
  //       const nextSibling = sl.nextElementSibling
  //       if(!nextSibling){
  //         sl.parentNode.click()
  //         return ;  
  //       } 
  //       if(PR.active) setTimeout(()=>nextSibling.classList.remove('o0'),500)
  //       sl.classList.remove('selectedEl')
  //       nextSibling.click()
  //       nextSibling.jumpTo()
  //       if(PR.active) PR.handleSideEl()          
  //     }      
  //     else if(e.key === 'ArrowUp'){
  //       e.preventDefault()        
  //       const sl = $('.selectedEl')        
  //       if(editEnable() || !sl || sl === container) return ;        
  //       let prevSibling = sl.previousElementSibling
  //       if(!prevSibling){
  //           sl.parentNode.click()
  //           return ;
  //       }
  //       sl.classList.remove('selectedEl')
  //       prevSibling.classList.add('selectedEl')
  //       prevSibling.jumpTo()        
  //       if(PR.active) PR.handleSideEl()        
  //     }      
  // }
// end editMode condition


})
// end event callback function
}
// end function shortcutHandler

function joinMultipleEl(){
    let selectedEls = $x('.selectedEl')
    if(!selectedEls) return ;
    let total_html = ''
    selectedEls.forEach(el=>{
        total_html += el.Html()
    })
    let new_section = create('sn',{
        class:'col-12 col-md-11 col-lg-9 content-section p-2 px-lg-3',
        html:total_html
    },'#topic-container')
    getAll('#modal-content .modal-body .selectedEl').forEach(eachEl=>{
            eachEl.classList.remove('selectedEl')
    })      
    new_section.click()
    new_section.jumpTo()
}
// end function component.create



function openRightSideBar(){
    const widgetBar = $('#prompt-offcanvas')
    let x = new bootstrap.Offcanvas(widgetBar)
    x.show()
}
