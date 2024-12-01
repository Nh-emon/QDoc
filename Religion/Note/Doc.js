// User-related modules
import { UserRepo } from './doc_module/userRepo.js';
import { show_user_details } from './doc_module/show_user_details.js';
import { update_user_data } from './doc_module/update_user_data.js';

// Guest mode modules
import * as guestMod from './doc_module/guestMod.js';

// Subject-related modules
import { show_folder_list } from './doc_module/show_folder_list.js';
import { show_subject_list } from './doc_module/show_subject_list.js';
import { new_folder_handler } from './doc_module/new_folder_handler.js';
import { new_subject_handler } from './doc_module/new_subject_handler.js';
import { subject_rename_handler } from './doc_module/subject_rename_handler.js';
import { subject_delete_handler } from './doc_module/subject_delete_handler.js';
import { update_subject } from './doc_module/update_subject.js';

// Chapter-related modules
import { show_chapter } from './doc_module/show_chapter.js';
import { new_chapter_handler } from './doc_module/new_chapter_handler.js';
import { chapter_rename_handler } from './doc_module/chapter_rename_handler.js';
import { chapter_delete_handler } from './doc_module/chapter_delete_handler.js';

// Topic-related modules
import { new_topic_handler } from './doc_module/new_topic_handler.js';
import { topic_rename_handler } from './doc_module/topic_rename_handler.js';
import { topic_delete_handler } from './doc_module/topic_delete_handler.js';

// Utility and event handling modules
import { handle_reload } from './doc_module/handle_reload.js';
import { redirect } from './doc_module/redirect.js';
import { handle_content_share } from './doc_module/handle_content_share.js';
import { handle_search } from './doc_module/handle_search.js';
import { handle_event_delegation } from './doc_module/handle_event_delegation.js';
import { save_content_handler } from './doc_module/save_content_handler.js';
import { modal_content_handler } from './doc_module/modal_content_handler.js';
import { init_content_creating } from './allModule/init_content_creating.js';

import { media_handler } from './doc_module/media_handler.js';


export class Doc {
    constructor(username,token,author,folder,subject,chapter,topic) {
        this.username = username;
        this.token = token;
        this.author = author;
        this.subject = subject.replace(/-/g, ' ');
        this.chapter = chapter.replace(/-/g, ' ');
        this.topic = topic.replace(/-/g, ' ');
        this.folder = folder.replace(/-/g, ' ')
        this.current_subject = null;
        this.current_chapter = null;
        this.current_topic = null;
        this.current_folder = 'subjects'
        this.user_data = null;
        this.current_subject_changes = 0;
        this.current_subject_download_link = null;
        this.offline_subject_list = [];

        // Guest mode methods
        this.disableGuestMode = guestMod.disableGuestMode;
        this.enableGuestMode = guestMod.enableGuestMode;
        this.initGuest = guestMod.initGuest;

        // User methods
        this.showUserDetails = show_user_details;
        this.updateUserData = update_user_data;

        // Subject methods
        this.showFolderList = show_folder_list;        
        this.showSubjectList = show_subject_list;
        this.newFolderHandler = new_folder_handler;
        this.newSubjectHandler = new_subject_handler;
        this.subjectRenameHandler = subject_rename_handler;
        this.subjectDeleteHandler = subject_delete_handler;
        this.updateSubject = update_subject;

        // Chapter methods
        this.showChapter = show_chapter;
        this.newChapterHandler = new_chapter_handler;
        this.chapterRenameHandler = chapter_rename_handler;
        this.chapterDeleteHandler = chapter_delete_handler;

         // Topic methods
        this.newTopicHandler = new_topic_handler;
        this.topicRenameHandler = topic_rename_handler;
        this.topicDeleteHandler = topic_delete_handler;

        // Utility and event handling methods
        this.handleReload = handle_reload;
        this.redirect = redirect;
        this.handleContentShare = handle_content_share;
        this.handleSearch = handle_search;
        this.handleEventDelegation = handle_event_delegation;
        this.saveContentHandler = save_content_handler;
        this.modalContentHandler = modal_content_handler;
        this.initContentCreating = init_content_creating;
        this.mediaHandler = media_handler

        this.checkUser();
    }

    checkUser() {
        this.author !== 'none' ? this.enableGuestMode() : this.initUserRepo();
    }

    initUserRepo() {
        this.userRepo = new UserRepo(this.username, this.token,this);
        this.initDoc();
    }

    async initDoc(retries = 3) {
        this.showStatus('...checking repositories');
        addBottomLoading('#nav', 'once');

        let repo_result = await this.userRepo.checkRequirement();
        if (!repo_result) {
            this.showStatus('failed to load repositories');
            removeBottomLoading('#nav');
            this.showStatus('...reloading in 3s');
            if (retries > 0) {
                setTimeout(async () => this.initDoc(retries - 1), 3000);
            } else {
                this.showStatus('failed to load repositories');
                return;
            }
        }

        this.showStatus('...checking userdata');
        let userData = await this.userRepo.getFile('user.json');
        if (!userData) {
            this.showStatus('failed to load userdata');
            removeBottomLoading('#nav');
            return;
        }
        
        this.showStatus('repositories loaded');
        this.user_data = JSON.parse(base64ToUtf8(userData.content));
        this.current_folder = this.user_data.last_visited_folder

        // Initialize components
        this.showUserDetails();
        this.showFolderList()
        this.showSubjectList();

        this.newFolderHandler();
        this.newSubjectHandler();
        this.subjectRenameHandler();
        this.subjectDeleteHandler();

        this.newChapterHandler();
        this.chapterRenameHandler();
        this.chapterDeleteHandler();

        this.topicRenameHandler();
        this.topicDeleteHandler();

        this.handleReload();
        this.modalContentHandler();
        this.saveContentHandler();
        this.handleEventDelegation();
        this.handleContentShare();
        this.initContentCreating();
        this.mediaHandler(this.userRepo)
    }


    increase_sub_changes() {
        this.current_subject_changes++;
        show('#subject-changes-counter');
        text('#subject-changes-counter', this.current_subject_changes);
    }


generateUrl() {
  if (!this.username || this.username === 'guest' || !this.current_folder) return;
  const currentFolder = this.current_folder.replace(/ /g, '-');  
  const currentSubject = this.current_subject?.subject_name?.replace(/ /g, '-');
  const currentChapter = this.current_chapter?.replace(/ /g, '-');
  const currentTopic = this.current_topic?.replace(/ /g, '-'); 
  let url = `/${this.username}/${currentFolder}`;
  if (currentSubject) {
    if (currentTopic) {
      url += `/${currentSubject}/${currentChapter}/${currentTopic}`;
    } else if (currentChapter) {
      url += `/${currentSubject}/${currentChapter}`;
    } else {
      url += `/${currentSubject}`;
    }
}
  const pageParameter = currentTopic || currentChapter || currentSubject;
  updatePageAddress(pageParameter || this.current_folder, url);
}



    autoEdit(element, callback) {
        attr(element, 'contenteditable', 'true');
        element.focus();

        Trigger(element, 'blur', () => {
            element.removeAttribute('contenteditable');
            let elText = stdText(removeSymbol(text(element)))
            text(element,elText)
            callback(elText);
        });

        Trigger(element, 'keydown', (e) => {
            if (e.key == 'Enter') {
                e.preventDefault();
                element.removeAttribute('contenteditable');
            }
        });
    }

    showToast(msg, icon) {
        let toast = get('#liveToast');
        if (!msg) return;
        text(get(toast, '.toast-msg'), msg);
        if (icon) {
            let toastIcon = get(toast, '.toast-icon');
            toastIcon.className = '';
            toastIcon.classList.add('fa-solid', `fa-${icon}`, 'fs-5', 'me-2', 'toast-icon');
        }
        get('#liveToastBtn').click();
    }

    showStatus(msg, autohide) {
        let msg_text = msg || ' ';
        let statusbar = get('#statusBar');
        text(statusbar, msg_text);
        if (autohide === true) {
            setTimeout(() => text(statusbar, ''), 1300);
        }
    }
}
