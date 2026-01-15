import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context) -> Dict[str, Any]:
    '''API для управления проектами портфолио: создание, чтение, обновление и удаление проектов'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
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
        
        if method == 'GET':
            query_params = event.get('queryStringParameters') or {}
            category = query_params.get('category')
            
            if category and category != 'Все':
                cursor.execute(
                    f"SELECT id, title, category, year, description, image_url, created_at FROM {schema_name}.projects WHERE category = %s ORDER BY created_at DESC",
                    (category,)
                )
            else:
                cursor.execute(
                    f"SELECT id, title, category, year, description, image_url, created_at FROM {schema_name}.projects ORDER BY created_at DESC"
                )
            
            rows = cursor.fetchall()
            projects = [
                {
                    'id': row[0],
                    'title': row[1],
                    'category': row[2],
                    'year': row[3],
                    'description': row[4],
                    'image': row[5],
                    'created_at': row[6].isoformat()
                }
                for row in rows
            ]
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'projects': projects}),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            title = body.get('title', '').strip()
            category = body.get('category', '').strip()
            year = body.get('year', '').strip()
            description = body.get('description', '').strip()
            image_url = body.get('image', '').strip()
            
            if not title or not category or not year or not image_url:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Title, category, year and image are required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                f"INSERT INTO {schema_name}.projects (title, category, year, description, image_url) VALUES (%s, %s, %s, %s, %s) RETURNING id, created_at",
                (title, category, year, description, image_url)
            )
            project_id, created_at = cursor.fetchone()
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'id': project_id,
                    'created_at': created_at.isoformat()
                }),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            project_id = body.get('id')
            
            if not project_id:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Project ID is required'}),
                    'isBase64Encoded': False
                }
            
            updates = []
            params = []
            
            if 'title' in body:
                updates.append('title = %s')
                params.append(body['title'])
            if 'category' in body:
                updates.append('category = %s')
                params.append(body['category'])
            if 'year' in body:
                updates.append('year = %s')
                params.append(body['year'])
            if 'description' in body:
                updates.append('description = %s')
                params.append(body['description'])
            if 'image' in body:
                updates.append('image_url = %s')
                params.append(body['image'])
            
            if not updates:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'No fields to update'}),
                    'isBase64Encoded': False
                }
            
            updates.append('updated_at = CURRENT_TIMESTAMP')
            params.append(project_id)
            
            cursor.execute(
                f"UPDATE {schema_name}.projects SET {', '.join(updates)} WHERE id = %s",
                params
            )
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True}),
                'isBase64Encoded': False
            }
        
        elif method == 'DELETE':
            query_params = event.get('queryStringParameters') or {}
            project_id = query_params.get('id')
            
            if not project_id:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Project ID is required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                f"DELETE FROM {schema_name}.projects WHERE id = %s",
                (project_id,)
            )
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True}),
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
