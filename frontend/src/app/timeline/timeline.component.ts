import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ServerService } from '../server.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  form: FormGroup;
  modalRef: BsModalRef;


  events: any[] = [];
  currentEvent: any = {id: null, name: '', description: '', date: new Date()};
  modalCallback: () => void;

  constructor(private fb: FormBuilder,
              private modalService: BsModalService,
              private server: ServerService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.currentEvent.name, Validators.required],
      description: this.currentEvent.description,
      date: [this.currentEvent.date, Validators.required],
    });
    this.getEvents();
  }

  private updateForm() {
    this.form.setValue({
      name: this.currentEvent.name,
      description: this.currentEvent.description,
      date: new Date(this.currentEvent.date)
    });
  }

  private getEvents() {
    this.server.getEvents().then((response: any) => {
      console.log('Response', response);
      this.events = response.map((ev) => {
        ev.body = ev.description;
        ev.header = ev.name;
        ev.icon = 'fa-clock-o';
        //ev.icon = 'http://localhost:30000/images/clock.svg';
        return ev;
      });
    });
  }

  addEvent(template) {
    this.currentEvent = {id: null, name: '', description: '', date: new Date()};
    this.updateForm();
    this.modalCallback = this.createEvent.bind(this);
    this.modalRef = this.modalService.show(template);
  }

  createEvent() {
    const newEvent = {
      name: this.form.get('name').value,
      description: this.form.get('description').value,
      date: this.form.get('date').value,
    };
    this.modalRef.hide();
    this.server.createEvent(newEvent).then(() => {
      this.getEvents();
    });
  }

  editEvent(index, template) {
    this.currentEvent = this.events[index];
    this.updateForm();
    this.modalCallback = this.updateEvent.bind(this);
    this.modalRef = this.modalService.show(template);
  }

  openReport(index){
    window.open("http://10.57.51.40:30000/" + this.events[index].name.replace('.zip', '') + "/logs/", "_blank");
  }

  updateEvent() {
    const eventData = {
      id: this.currentEvent.id,
      name: this.form.get('name').value,
      description: this.form.get('description').value,
      date: this.form.get('date').value,
    };
    this.modalRef.hide();
    this.server.updateEvent(eventData).then(() => {
      this.getEvents();
    });
  }

  deleteEvent(index) {
    this.server.deleteEvent(this.events[index]).then(() => {
      this.getEvents();
    });
  }

  onCancel() {
    this.modalRef.hide();
  }

  downloadFile(index){
    const eventData = {
      id: this.events[index].id
    };
    console.log('newEvent', eventData)

    this.server.getFiles(eventData).then((response: Response) => {

        //console.log('Response', response[index].file.data);
        console.log('Response?', response);
        var bytes = new Uint8Array(response[0].file.data); // pass your byte response to this constructor
        //console.log ('bytes', bytes)
        var blob=new Blob([bytes], {type: "application/zip"});// change resultByte to bytes

        var link=document.createElement('a');
        link.href=window.URL.createObjectURL(blob);
        link.download= response[0].name;
        link.click();

    });
 }
}
