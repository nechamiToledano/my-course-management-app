import { Routes } from "@angular/router";
import { AuthComponent } from "./components/auth/auth.component";
import { CourseDetailsComponent } from "./components/course-details/course-details.component";
import { CourseManagementComponent } from "./components/course-management/course-management.component";
import { CoursesComponent } from "./components/courses/courses.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { HomeComponent } from "./components/home/home.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { LessonsComponent } from "./components/lessons/lessons.component";
import { AuthGuard } from "./guards/auth.guard";

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  {
    path: '',
    component: LayoutComponent, // ✅ Wrap pages inside LayoutComponent
    children: [
      { path: '', component: HomeComponent },
      { path: 'auth', component: AuthComponent },
      { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] },
      { path: 'course-management', component: CourseManagementComponent, canActivate: [AuthGuard] },
      { path: 'courses/:id', component: CourseDetailsComponent, canActivate: [AuthGuard] },
      { path: 'lessons/:courseId', component: LessonsComponent },

    ],
  },
];
