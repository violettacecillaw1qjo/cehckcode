#!/usr/bin/env groovy

node {
  properties([disableConcurrentBuilds()])

  try {

    project = "sora-pos-web-client"
    k8sProjectName = "sora-pos-web-client"
    dockerRepo = "harbor.omicrm.services"
    imagePrefix = "ci"
    dockerFile = "Dockerfile"
    buildNumber = "${env.BUILD_NUMBER}"
    k8sCluster = "local"

    imageName = "${dockerRepo}/${imagePrefix}/${project}-" + env.BRANCH_NAME

    stage('Workspace Clearing') {
      cleanWs()
    }

    stage('checkout code') {
      checkout scm
      sh "git checkout ${env.BRANCH_NAME} && git reset --hard origin/${env.BRANCH_NAME}"
    }

    stage('build image') {
      sh """
        egrep -q '^FROM .* AS builder\$' ${dockerFile} \
          && docker build -t ${imageName}-stage-builder --target builder -f ${dockerFile} .
        docker build -t ${imageName}:${env.BRANCH_NAME} -f ${dockerFile} .
      """
    }
    stage('push') {
      sh """
        docker push ${imageName}:${env.BRANCH_NAME}
        docker tag ${imageName}:${env.BRANCH_NAME} ${imageName}:${env.BRANCH_NAME}-build-${buildNumber}
        docker push ${imageName}:${env.BRANCH_NAME}-build-${buildNumber}
      """
    }

    imageBuild = "${imageName}:${env.BRANCH_NAME}-build-${buildNumber}"

    switch(env.BRANCH_NAME) {
      case 'dev':
        stage('deploy-dev') {
          sh """
            kubectl --kubeconfig /u01/rancher/rancher-omi.yaml set image deployment/${k8sProjectName} ${k8sProjectName}=${imageBuild} -n dev
            kubectl --kubeconfig /u01/rancher/rancher-omi.yaml rollout status deployment/${k8sProjectName} -n dev
          """
        }
      break
	  case 'stg':
    case 'stg-localnew':
        stage('deploy-stg') {
          sh """
            kubectl --kubeconfig /u01/rancher/rancher-omi.yaml set image deployment/${k8sProjectName} ${k8sProjectName}=${imageBuild} -n stg
            kubectl --kubeconfig /u01/rancher/rancher-omi.yaml rollout status deployment/${k8sProjectName} -n stg
          """
        }
      break
    }

  } catch (e) {
    currentBuild.result = "FAILED"
    throw e
  }
}
