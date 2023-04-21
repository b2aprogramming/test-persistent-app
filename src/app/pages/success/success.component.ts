import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EmitterService } from 'src/app/shared/services/emitter.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit{
  constructor(private emitterService: EmitterService, private router: Router) {

  }

  public ngOnInit(): void {
      this.emitterService.getFormValues().subscribe((res) => {
        console.log(res);
      })
  }

  public goToHome() {
    this.router.navigate(['/'])
  }

}
