/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {BehaviorSubject, Subject} from 'rxjs';
import {Project} from "./ProjectModels";

const selectedProject = new BehaviorSubject<Project | undefined>(undefined);
const currentFile = new BehaviorSubject<string | undefined>(undefined);
const mode = new BehaviorSubject<"design" | "code">("design");
const log = new Subject<["add" | "set", string]>();

export class ShowLogCommand {
    type: 'container' | 'pipeline'
    name: string
    environment: string
    show: boolean

    constructor(type: "container" | "pipeline", name: string, environment: string, show: boolean) {
        this.type = type;
        this.name = name;
        this.environment = environment;
        this.show = show;
    }
}

export class ShowTraceCommand {
    name: string
    show: boolean

    constructor(name: string, show: boolean) {
        this.name = name;
        this.show = show;
    }
}
export const ProjectEventBus = {

    selectProject: (project: Project) => selectedProject.next(project),
    onSelectProject: () => selectedProject.asObservable(),

    setMode: (m: 'design' | 'code') =>  mode.next(m),
    onSetMode: () => mode.asObservable(),

    sendLog: (type: "add" | "set", m: string) =>  log.next([type, m]),
    onLog: () => log.asObservable(),
}
