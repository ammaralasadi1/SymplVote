import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.css']
})
export class VotesComponent implements OnInit {
  votes: any[];
  private url = 'https://evening-forest-91835.herokuapp.com/api/v1/votes';


  constructor(private http: Http) {}

  ngOnInit() {
    this.http.get(this.url).subscribe(response => {
      this.votes = response.json().data;
      console.log(response.json().data);
    });
  }

  createVote(title: HTMLInputElement, user: HTMLInputElement) {
    if (title.value === '' || user.value === '') {
      alert('Please Type the poll name and your name');
    } else {
      const vote = { title: title.value, user: user.value, count: 0 };
      title.value = '';
      user.value = '';
      this.http.post(this.url, vote).subscribe(response => {
        this.votes.splice(this.votes.length, 0, vote);
        console.log(response);
        if (response.status === 200) {
          location.reload();
        }
      });
    }
  }

  updateVote(vote) {
    const counter = vote.count + 1;
    vote.count = counter;
    const newCount = { count: counter };
    this.http.put(this.url + '/' + vote.id, newCount).subscribe(response => {
      console.log(response);
    });
  }

  deleteVote(vote) {
    this.http.delete(this.url + '/' + vote.id).subscribe(response => {
      const index = this.votes.indexOf(vote);
      this.votes.splice(index, 1);
      console.log(response);
    });
  }
}
