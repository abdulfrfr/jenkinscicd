pipeline {
    agent any

    stages {
        stage('Build and Push Docker Image') {
            steps {
                script {
                    sh """
                    docker build -t abdulfrfr/mongonode:latest .

                    docker login -u abdulfrfr -p dckr_pat_Dt_l5v7eRJ8oRXawg5NqUncZ_5I

                    docker push abdulfrfr/mongonode:latest

                    """
                }
            }
        }
    }

    post {
        failure {
            // Actions to take on pipeline failure
            withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws']]) {
                    sh """
                     aws sns publish --topic-arn arn:aws:sns:us-east-1:879092596042:new_topic --subject "pipeline success" --message "pipeline failed!" --region us-east-1
                    """
                }
        }
        success {
            // Actions to take on pipeline success
            withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws']]) {
                    sh """
                     aws sns publish --topic-arn arn:aws:sns:us-east-1:879092596042:new_topic --subject "pipeline success" --message "pipeline successful!" --region us-east-1
                    """
                }
        }
    }
}
