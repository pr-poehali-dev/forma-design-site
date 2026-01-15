import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context) -> Dict[str, Any]:
    '''API для работы с контактными заявками: создание новых заявок и получение списка'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    schema_name = os.environ.get('MAIN_DB_SCHEMA', 'public')
    
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Database configuration missing'}),
            'isBase64Encoded': False
        }
    
    conn = None
    try:
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor()
        
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            name = body.get('name', '').strip()
            email = body.get('email', '').strip()
            phone = body.get('phone', '').strip()
            message = body.get('message', '').strip()
            
            if not name or not email or not message:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Name, email and message are required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                f"INSERT INTO {schema_name}.contacts (name, email, phone, message) VALUES (%s, %s, %s, %s) RETURNING id, created_at",
                (name, email, phone, message)
            )
            contact_id, created_at = cursor.fetchone()
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'id': contact_id,
                    'created_at': created_at.isoformat()
                }),
                'isBase64Encoded': False
            }
        
        elif method == 'GET':
            limit = int(event.get('queryStringParameters', {}).get('limit', 50))
            cursor.execute(
                f"SELECT id, name, email, phone, message, created_at FROM {schema_name}.contacts ORDER BY created_at DESC LIMIT %s",
                (limit,)
            )
            rows = cursor.fetchall()
            
            contacts = [
                {
                    'id': row[0],
                    'name': row[1],
                    'email': row[2],
                    'phone': row[3],
                    'message': row[4],
                    'created_at': row[5].isoformat()
                }
                for row in rows
            ]
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'contacts': contacts, 'total': len(contacts)}),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Method not allowed'}),
                'isBase64Encoded': False
            }
    
    except Exception as e:
        if conn:
            conn.rollback()
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    
    finally:
        if conn:
            cursor.close()
            conn.close()
