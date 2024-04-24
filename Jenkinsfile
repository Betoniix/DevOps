pipeline {
    agent any

    stages {
        stage('Preparación') {
            steps {
                script {
                    sh 'ls'
                    env.BRANCH_NAME = sh(script: 'echo $GIT_BRANCH | cut -d"/" -f2', returnStdout: true).trim()
                }
            }
        }
        stage('Construcción y Docker Build') {
            steps {
                script {
                    sh 'docker build -t "sicei-$BRANCH_NAME:1.0.0-${BUILD_NUMBER}" .'
                }
            }
        }
    }
}
