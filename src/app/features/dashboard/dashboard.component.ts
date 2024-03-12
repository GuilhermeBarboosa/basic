import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from 'src/app/routes/dashboard.service';
import { UtilsService } from 'src/app/services/utils.service';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  tipoPagina = 'CMS';

  inscricaoChart: any = [];
  usersChart: any = [];
  qtdFuncaoByEdital: any = [];
  getInfo: any;

  constructor(
    private dashboard: DashboardService,
    private utils: UtilsService,
  ) {}

  ngOnInit() {
    this.dashboard.getAll().subscribe((dashboardResponse) => {
      var dashboardJson = JSON.parse(JSON.stringify(dashboardResponse));

      this.generatePieInscricao(dashboardJson.quantidadeInscritoByEditalOutput);
      this.generateLineUsers(dashboardJson.quantidadeUserByMesOutput);
      this.getInfo = dashboardJson.quantidadeAllOutput;
    });

  }

  private generatePieInscricao(dashboardJson: any) {
    let labels: any = [];
    // let qtdEdital: any = [];
    let colors: any = [];

    // dashboardJson.forEach((dashboard: any) => {
    //   labels.push(dashboard.edital);
    //   qtdEdital.push(dashboard.qtdEdital);
    //   colors.push(this.utils.generateColors());
    // });

    let data = {
      labels: labels,
      datasets: [
        {
          label: 'Quantidade',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          borderColors: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          borderWidth: 1,
        },
      ],
    };

    this.inscricaoChart = new Chart('inscricaoChart', {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Quantidade inscrito por edital',
          },
          legend: {
            display: true,
            labels: {
              font: {
                size: 14,
              },
            },
          },
        },
      },
    });
  }

  private generateLineUsers(user: any) {
    let labels: any = [];
    let qtdUser: any = [];
    let colors: any = [];

    user.forEach((user: any) => {
      labels.push(user.data);
      qtdUser.push(user.qtdUser);
      colors.push(this.utils.generateColors());
    });

    let data = {
      labels: labels,
      datasets: [
        {
          label: 'Usuários',
          data: qtdUser,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1,
        },
      ],
    };

    this.usersChart = new Chart('userChart', {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          decimation: {
            enabled: false,
          },
          title: {
            display: true,
            text: 'Quantidade de usuarios',
          },
          legend: {
            display: true,
            labels: {
              font: {
                size: 15,
              },
            },
          },
        },
      },
    });
  }


}
