pipeline {

    agent none
    //agent {label 'master'}
    
    environment {
        PASS = credentials('sgb-hub-pass') 
    }
    
    parameters {
        choice(name: 'DEPLOY_TAG', choices: ['dev', 'prod'], description: 'Deploy Environment')
    }

    stages {

        stage('Build') {
            agent {label 'master'}
            steps {
                sh '''
                    ./jenkins/build/build.sh $DEPLOY_TAG
                '''
            }

        }

        stage('Push') {
            agent {label 'master'}
            steps {
                sh './jenkins/push/push.sh'
            }
        }

        stage('Deploy') {
            agent {label 'ho-srv-chat-dev'}
            steps {
                sh './jenkins/deploy/deploy.sh'
            }
        }
    }
    
    post {
        always {
            rocketSend "${env.JOB_NAME} - Build #${env.BUILD_NUMBER} [${currentBuild.currentResult}] (<${env.BUILD_URL}|Open>)"
        }
    }
}