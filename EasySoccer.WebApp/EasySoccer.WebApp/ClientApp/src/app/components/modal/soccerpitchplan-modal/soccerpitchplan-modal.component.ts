import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PlanGenerationConfigService } from "../../../service/plan-generation-config.service";
import { Soccerpitchplan } from "../../../model/soccerpitchplan";
import { SoccerpitchplanService } from "../../../service/soccerpitchplan.service";
import { ToastserviceService } from "../../../service/toastservice.service";

@Component({
  selector: "app-soccerpitchplan-modal",
  templateUrl: "./soccerpitchplan-modal.component.html",
  styleUrls: ["./soccerpitchplan-modal.component.css"],
})
export class SoccerpitchplanModalComponent implements OnInit {
  modalSelectedPlan: Soccerpitchplan = new Soccerpitchplan();
  modalTitle: string;
  plansConfig: Array<any> = new Array<any>();
  selectedConfigId: number;
  constructor(
    public activeModal: NgbActiveModal,
    private soccerPitchPlanService: SoccerpitchplanService,
    private toastService: ToastserviceService,
    private planConfigService: PlanGenerationConfigService
  ) {}

  ngOnInit() {
    if (
      this.modalSelectedPlan &&
      this.modalSelectedPlan.id &&
      this.modalSelectedPlan.id > 0
    ) {
      this.modalTitle = "Editar plano";
    } else {
      this.modalTitle = "Adicionar novo plano";
    }
    this.getplansConfig();
  }

  getplansConfig() {
    this.planConfigService.getPlanGenerationConfig(1, 99).subscribe(
      (res) => {
        this.plansConfig = res.data;
      },
      (error) => {
        this.toastService.showError(
          "Erro ao consultar dados. " + error.error.Message
        );
      }
    );
  }

  save() {
    if (
      this.modalSelectedPlan &&
      this.modalSelectedPlan.id &&
      this.modalSelectedPlan.id > 0
    ) {
      this.soccerPitchPlanService
        .patchSoccerPitchPlan(this.modalSelectedPlan)
        .subscribe(
          (data) => {
            this.toastService.showSuccess("Plano atualizado com sucesso!");
            this.modalSelectedPlan = new Soccerpitchplan();
            this.activeModal.close();
          },
          (error) => {
            this.toastService.showError(
              "Erro ao consultar dados. " + error.error.Message
            );
          }
        );
    } else {
      this.soccerPitchPlanService
        .postSoccerPitchPlan(this.modalSelectedPlan)
        .subscribe(
          (data) => {
            this.toastService.showSuccess("Plano inserido com sucesso!");
            this.modalSelectedPlan = new Soccerpitchplan();
            this.activeModal.close();
          },
          (error) => {
            this.toastService.showError(
              "Erro ao consultar dados. " + error.Message
            );
          }
        );
    }
  }
}